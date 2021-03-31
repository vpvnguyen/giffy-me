import { ReactNode } from "react";

interface IFlexboxContainerFullWidthCentered {
  children: ReactNode;
  classes?: string;
}

export const FlexboxContainerFullWidthCentered = (
  props: IFlexboxContainerFullWidthCentered
) => (
  <div className={`w-full flex justify-center items-center ${props.classes}`}>
    {props.children}
  </div>
);
