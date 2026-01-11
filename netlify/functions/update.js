import { getStore } from "@netlify/blobs";

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response("POST only", { status: 405 });
  }

  const body = await request.json();

  const {
    id,
    CompanyName,
    LicenseKey,
    EndDate
  } = body || {};

  if (!id || !CompanyName || !LicenseKey || !EndDate) {
    return new Response(
      JSON.stringify({
        error: "id, CompanyName, LicenseKey and EndDate are required"
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const store = getStore("licenses");

  const dataToSave = {
    id,
    CompanyName,
    LicenseKey,
    EndDate
  };

  // LicenseKey is the Blob key
  await store.set(LicenseKey, JSON.stringify(dataToSave));

  return new Response(
    JSON.stringify({
      success: true,
      data: dataToSave
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
