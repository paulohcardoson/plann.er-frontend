import { PropsWithChildren } from "react";
import { IProps } from "./types/props";

const Modal: React.FC<PropsWithChildren<IProps>> = ({
  isOpen,
  onClickOnBlank = () => {},
  transitionTime = 0.5,
  children,
}) => {
  return (
    <div
      className="fixed inset-0 !my-0 bg-black/60 flex items-center justify-center"
      style={{
        opacity: isOpen ? 1 : 0,
        left: isOpen ? "0vw" : "990vw",
        transition: `
          opacity ${transitionTime}s,
          left 0s ${isOpen ? 0 : transitionTime}s
        `,
      }}
      onClick={onClickOnBlank}
    >
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
