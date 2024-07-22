import { z } from "zod";

export interface IFormInputs {
  email: string;
}

export const schema = z.object({
  email: z.string().email(),
});
