export async function onRequest(context: any) {
    const db = context.env.yezaidata;
    const { results } = await db.prepare("SELECT id, title, slug FROM routes LIMIT 20;").all();
    return Response.json({ routes: results });
  }
  