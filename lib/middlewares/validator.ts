import { z } from "zod";

export async function validateBody<T extends z.ZodTypeAny>(
  req: Request,
  schema: T
) {
  const body = await req.json();

  return schema.safeParse(body);
}