import { z } from "zod";
import { BaseFormCreateSchema, BaseSchema } from "./schema";
import { moneyOptional, moneyRequired, numberRequired, stringRequired } from "./data";
import { ProductSchema } from "./product";
import { CategorySchema } from "./category";

export const MenuItemSchema = BaseSchema.merge(ProductSchema).merge(z.object({
  categories: z.array(z.string()).optional()
}));

export type IMenuItem = z.infer<typeof MenuItemSchema>;

// Create Validation
export const MenuItemCreateSchema = z
  .object({
    name: stringRequired,
    price: moneyRequired,
    stock: numberRequired,
    small_price: moneyOptional,
    large_price: moneyOptional,
  })
  .merge(BaseFormCreateSchema);

export type IMenuItemCreateSchema = z.infer<typeof MenuItemCreateSchema>;

// #region Form Create
export const MenuItemFormSchema = ProductSchema.merge(
  z.object({
    categories: z.array(CategorySchema),
    price: moneyRequired,
  }),
);

export type IMenuItemFormSchema = z.infer<typeof MenuItemFormSchema>;
