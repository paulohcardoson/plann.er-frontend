import { z } from "zod";

export interface IFormInputs {
  email: string;
}

export const formSchema = z.object({
  email: z.string().email(),
});
