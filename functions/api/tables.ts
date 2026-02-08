export async function onRequest(context: any) {
    try {
      const db = context.env.yezadata;
  
      const { results } = await db
        .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;")
        .all();
  
      return Response.json({ tables: results });
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: String(err?.message || err) }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }
  }
  