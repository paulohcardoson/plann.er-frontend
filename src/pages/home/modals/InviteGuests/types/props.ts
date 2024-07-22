import { FieldArrayWithId } from "react-hook-form";
import { IFormInputs } from "@pages/home/types/form";
import { IModalProps } from "@components/Modal/types/props";

export interface IInviteGuestsModalProps extends IModalProps {
  emailsToInvite: FieldArrayWithId<IFormInputs, "emails_to_invite", "id">[];
  addNewEmailToInvite: (email: string) => void;
  removeEmailFromInvites: (id: number) => void;
}
