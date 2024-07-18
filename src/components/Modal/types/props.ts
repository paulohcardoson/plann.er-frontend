export interface IProps {
  isOpen: boolean;
  onClickOnBlank?: () => void;
  transitionTime?: number;
}

export interface IModalProps {
  isOpen: boolean;
  onClickToClose: () => unknown;
}
