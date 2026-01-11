import { getStore } from "@netlify/blobs";

export default async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "POST only" };
  }

  const { LicenseKey, ExpiryDate } = JSON.parse(event.body || "{}");
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
    body: JSON.stringify({ success: true })
  };
}
