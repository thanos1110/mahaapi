import { getStore } from "@netlify/blobs";

export default async function handler(request) {
  const store = getStore("licenses");
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/").filter(Boolean);

  // /getall
  if (pathParts[pathParts.length - 1] === "getall") {
    const { blobs } = await store.list();
    const result = [];

    for (const item of blobs) {
      const val = await store.get(item.key);
      if (val) result.push(JSON.parse(val));
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  // /get/{LicenseKey}
  const licenseKey = pathParts[pathParts.length - 1];
  const value = await store.get(licenseKey);

  if (!value) {
    return new Response(
      JSON.stringify({ error: "License not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(value, {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
