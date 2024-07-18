import { IActivity } from "@base/types/IActivity";
import { ITrip } from "@base/types/ITrip";
import { IModalProps } from "@components/Modal/types/props";

export interface IProps extends IModalProps {
  trip: ITrip;
  addActivity: (activity: IActivity) => unknown;
}
