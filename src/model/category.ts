import { z } from "zod";
import { BaseFormCreateSchema, BaseFormUpdateSchema, BaseSchema } from "./schema";

export const CategorySchema = z
  .object({
    name: z.string(),
  })
  .merge(BaseSchema);

export type ICategory = z.infer<typeof CategorySchema>;

export type ICategoryCreateSchema = z.infer<typeof CategorySchema>;

export const CategoryFormSchema = z.object({}).merge(CategorySchema);

export type ICategoryFormSchema = z.infer<typeof CategoryFormSchema>;

// #region Form Create
const CategoryFormCreateSchema = CategorySchema.merge(z.object({})).merge(BaseFormCreateSchema);
export default CategoryFormCreateSchema;

export type ICategoryFormCreateSchema = z.infer<typeof CategoryFormCreateSchema>;
// #endregion

// #region Form Update
export const CategoryFormUpdateSchema = CategorySchema.merge(z.object({})).merge(BaseFormUpdateSchema);

export type ICategoryFormUpdateSchema = z.infer<typeof CategoryFormUpdateSchema>;
// #endregion
