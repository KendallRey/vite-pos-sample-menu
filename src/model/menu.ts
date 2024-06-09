import { z } from "zod";

export const MenuItemSchema = z.object({
  name: z.string(),
});

export type IMenuItemSchema = z.infer<typeof MenuItemSchema>;
