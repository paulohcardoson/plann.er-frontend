import { IParticipant } from "@base/types/IParticipant";
import { ITrip } from "@base/types/ITrip";
import { IModalProps } from "@components/Modal/types/props";

export interface IProps extends IModalProps {
  trip: ITrip;
  participants: IParticipant[];
  addParticipant: (participant: IParticipant) => unknown;
}
