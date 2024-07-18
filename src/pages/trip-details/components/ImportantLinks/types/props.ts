import { ILink } from "@base/types/ILink";

export interface IProps {
  links: ILink[];
  onClickToAddLink: () => unknown;
}
