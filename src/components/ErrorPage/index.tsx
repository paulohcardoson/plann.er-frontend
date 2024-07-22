import { IProps } from "./types/props";

const ErrorPage: React.FC<IProps> = ({
  code = 500,
  message = "Unexpected error.",
}) => (
  <div className="absolute-center text-center font-code font-bold">
    <p className=" text-white/25 text-9xl">{code}</p>
    <p className=" text-white text-4xl">{message}</p>
  </div>
);

export default ErrorPage;
