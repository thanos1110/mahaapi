import { getStore } from "@netlify/blobs";

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response("POST only", { status: 405 });
  }

  const body = await request.json();

  const {
    id,
    CompanyName,
    Address,
    Contact,
    LicenseKey,
    EndDate
  } = body || {};

  // Validate required fields
  if (
    !id ||
    !CompanyName ||
    !Address ||
    !Contact ||
    !LicenseKey ||
    !EndDate
  ) {
    return new Response(
      JSON.stringify({
        error:
          "id, CompanyName, Address, Contact, LicenseKey and EndDate are required"
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const store = getStore("licenses");

  const dataToSave = {
    id,
    CompanyName,
    Address,
    Contact,
    LicenseKey,
    EndDate
  };

  // Store using LicenseKey as unique key
  await store.set(LicenseKey, JSON.stringify(dataToSave));

  return new Response(
    JSON.stringify({
      success: true,
      data: dataToSave
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
