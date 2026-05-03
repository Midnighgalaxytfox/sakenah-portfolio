/**
 * app/api/contact/route.js
 * Lazy-import Prisma at request time to prevent build-time errors.
 */

export async function POST(request) {
  try {
    // parse request body (adjust fields to match your frontend)
    const body = await request.json();

    // dynamic import of our helper ensures import doesn't run at module load
    const { getPrisma } = await import("../../../lib/prisma");
    const prisma = await getPrisma();

    // example: adjust table/fields to match your schema
    const created = await prisma.contact.create({
      data: {
        name: body.name ?? "Anonymous",
        email: body.email ?? null,
        message: body.message ?? "",
      }
    });

    return new Response(JSON.stringify({ success: true, id: created.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
