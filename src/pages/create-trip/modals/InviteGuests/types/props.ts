import { IFormInputs } from "@pages/create-trip/types/form";
import { FieldArrayWithId } from "react-hook-form";
import { IModalProps } from "../../types/IModalProps";

export interface IInviteGuestsModalProps extends IModalProps {
  emailsToInvite: FieldArrayWithId<IFormInputs, "emails_to_invite", "id">[];
  addNewEmailToInvite: (email: string) => void;
  removeEmailFromInvites: (id: number) => void;
}
