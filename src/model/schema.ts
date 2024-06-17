import { z } from "zod";

/**
 * Base Model of all database model.
 * @remarks
 * Do not remove the `id`❗
 */
export const ModelSchema = z.object({
  id: z.string(),
});

export type IModel = z.infer<typeof ModelSchema>;

export const BaseSchema = z
  .object({
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable(),
    archived: z.boolean(),
    description: z.string().nullable().optional(),
    remarks: z.string().nullable().optional(),
  })
  .merge(ModelSchema);

// For Create
export const BaseFormCreateSchema = z.object({
  // not required
  id: z.undefined(),
  created_at: z.object({}),
  updated_at: z.object({}),
  deleted_at: z.object({}).nullable(),
  archived: z.boolean(),
});
export type IBaseFormCreateSchema = z.infer<typeof BaseFormCreateSchema>;

// For Update
export const BaseFormUpdateSchema = z.object({
  created_at: z.object({}).or(z.string()).optional(),
  updated_at: z.object({}).or(z.string()),
  deleted_at: z.object({}).or(z.string()).optional(),
  archived: z.boolean().optional(),
});

export type IBaseFormUpdateSchema = z.infer<typeof BaseFormUpdateSchema>;

// For Delete
export const BaseFormDeleteSchema = z.object({
  created_at: z.object({}).optional(),
  updated_at: z.object({}).optional(),
  deleted_at: z.object({}),
  archived: z.boolean(),
});

export type IBaseFormDeleteSchema = z.infer<typeof BaseFormDeleteSchema>;
