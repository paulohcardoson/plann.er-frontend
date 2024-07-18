import { TFormControl } from "@base/pages/create-trip/types/form";

export interface IConfirmTripModalProps {
  control: TFormControl;
  isOpen: boolean;
  onClickToClose: () => unknown;
}
