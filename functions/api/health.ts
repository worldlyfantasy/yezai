export async function onRequest(context: any) {
    try {
      const db = context.env.yezaidata; // 这里必须和你绑定的 Name 一致
  
      // 最简单的连通性测试：SELECT 1
      const res = await db.prepare("SELECT 1 as ok").first();
  
      return new Response(
        JSON.stringify({ connected: true, res }),
        { headers: { "content-type": "application/json" } }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({ connected: false, error: String(err?.message || err) }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }
  }