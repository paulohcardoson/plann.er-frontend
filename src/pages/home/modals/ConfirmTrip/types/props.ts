import { TFormControl } from "@pages/home/types/form";

export interface IConfirmTripModalProps {
  control: TFormControl;
  isOpen: boolean;
  onClickToClose: () => unknown;
}
