import { z } from "zod";
import { BaseFormCreateSchema, BaseSchema } from "./schema";
import { CategorySchema } from "./category";

export const ProductSchema = z
  .object({
    name: z.string(),
    small_price: z.number().optional(),
    large_price: z.number().optional(),
    price: z.number(),
    categories: z.array(CategorySchema),
    stock: z.number(),
  })
  .merge(BaseSchema);

export const ProductCreateSchema = ProductSchema.merge(z.object({
  
})).merge(BaseFormCreateSchema)

export type IProductCreateSchema = z.infer<typeof ProductCreateSchema>;

