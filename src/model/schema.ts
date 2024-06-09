import { z } from "zod";

export const BaseSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
  archived: z.boolean(),
});

export const BaseFormSchema = z.object({});

export type IBaseFormSchema = z.infer<typeof BaseFormSchema>;
