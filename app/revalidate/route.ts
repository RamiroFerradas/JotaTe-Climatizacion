import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");

  if (secret !== process.env.NEXT_PUBLIC_SECRET_TOKEN) {
    return Response.json({ revalidated: false });
  }
  revalidatePath("/productos");
  revalidatePath("/");
  revalidateTag("productos");
  return Response.json({ revalidated: true });
}
