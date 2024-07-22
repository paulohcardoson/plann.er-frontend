import { z } from "zod";

export interface IFormInputs {
  title: string;
  occurs_at: Date;
}

export const schema = z.object({
  title: z.string(),
  occurs_at: z.coerce.date(),
});
