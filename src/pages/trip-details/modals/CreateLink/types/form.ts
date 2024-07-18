import { z } from "zod";

export interface IFormInputs {
  title: string;
  url: string;
}

export const schema = z.object({
  title: z.string(),
  url: z.string().url(),
});
