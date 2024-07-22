import ApiError from "@base/shared/api/errors/ApiError";
import { IActivity } from "@base/types/IActivity";
import { ILink } from "@base/types/ILink";
import { IParticipant } from "@base/types/IParticipant";
import { ITrip } from "@base/types/ITrip";

export interface IProps {
  trip: ITrip;
  activities: IActivity[];
  participants: IParticipant[];
  links: ILink[];
}

export type TServerProps = IProps | { error?: any };
