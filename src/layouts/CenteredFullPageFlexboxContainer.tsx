import { ReactNode } from "react";

interface ICenteredFullPageFlexboxContainer {
  children: ReactNode;
  classes?: string;
}

export const CenteredFullPageFlexboxContainer = (
  props: ICenteredFullPageFlexboxContainer
) => (
  <div
    className={`h-screen w-full flex justify-center items-center ${props.classes}`}
  >
    {props.children}
  </div>
);
