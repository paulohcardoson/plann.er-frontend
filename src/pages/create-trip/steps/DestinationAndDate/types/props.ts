import { TFormControl } from "../../../types/form";

export interface IDestinationAndDateStepProps {
  control: TFormControl;
  isGuestsInputOpen: boolean;
  onClickToOpenGuestsInput: () => void;
  onClickToCloseGuestsInput: () => void;
}
