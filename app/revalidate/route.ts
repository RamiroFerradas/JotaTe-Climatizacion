import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function GET() {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");

  if (authorization !== process.env.NEXT_PUBLIC_SECRET_TOKEN) {
    return Response.json({ revalidated: false });
  }
  revalidatePath("/productos");
  revalidatePath("/products");
  revalidatePath("/");
  return Response.json({ revalidated: true });
}
