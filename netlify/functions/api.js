import { getStore } from "@netlify/blobs";

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response("POST only", { status: 405 });
  }

  const body = await request.json();
  const { LicenseKey, ExpiryDate } = body || {};

  if (!LicenseKey || !ExpiryDate) {
    return new Response(
      JSON.stringify({ error: "LicenseKey and ExpiryDate required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const store = getStore("licenses");

  await store.set(
    LicenseKey,
    JSON.stringify({
      LicenseKey,
      ExpiryDate,
      updatedAt: new Date().toISOString()
    })
  );

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
