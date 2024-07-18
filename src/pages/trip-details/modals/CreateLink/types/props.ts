import { ILink } from "@base/types/ILink";
import { ITrip } from "@base/types/ITrip";
import { IModalProps } from "@components/Modal/types/props";

export interface IProps extends IModalProps {
  trip: ITrip;
  addLink: (link: ILink) => unknown;
}
