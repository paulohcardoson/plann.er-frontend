import { z } from "zod";
import { Control } from "react-hook-form";
import { DateRange } from "react-day-picker";

export interface IFormInputs {
  // Trip
  destination: string;
  date_range: DateRange;

  // Owner
  owner_name: string;
  owner_email: string;

  // Emails to Invite
  emails_to_invite: { email: string }[];
}

export type TFormControl = Control<IFormInputs>;

export const formSchema = z.object({
  destination: z.string(),
  date_range: z.object({ from: z.date().optional(), to: z.date().optional() }),
  owner_name: z.string(),
  owner_email: z.string().email(),
  emails_to_invite: z.array(
    z.object({
      email: z.string().email(),
    })
  ),
});
