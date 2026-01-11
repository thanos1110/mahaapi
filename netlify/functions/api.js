import { getStore } from "@netlify/blobs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Only POST allowed"
    };
  }

  const body = JSON.parse(event.body || "{}");
  const { LicenseKey, ExpiryDate } = body;

  if (!LicenseKey || !ExpiryDate) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "LicenseKey and ExpiryDate are required"
      })
    };
  }

  // IMPORTANT: no manual siteID / token in NEW project
  const store = getStore("licenses");

  await store.set(
    LicenseKey,
    JSON.stringify({
      LicenseKey,
      ExpiryDate,
      updatedAt: new Date().toISOString()
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      LicenseKey,
      ExpiryDate
    })
  };
}
