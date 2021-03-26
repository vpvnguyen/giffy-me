import { ReactNode } from "react";

interface ICenteredFullPageFlexboxContainer {
  children: ReactNode;
}

export const CenteredFullPageFlexboxContainer = (
  props: ICenteredFullPageFlexboxContainer
) => (
  <div className="h-screen w-full flex justify-center items-center">
    {props.children}
  </div>
);
