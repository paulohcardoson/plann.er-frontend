import { IParticipant } from "@base/types/IParticipant";

export interface IProps {
  participants: IParticipant[];
  onClickToAddParticipant: () => unknown;
}
