import { ReactNode } from "react";

interface IFlexContainerPageFullWidthCenterProps {
  children: ReactNode;
  classes?: string;
}

interface IFlexContainerCenterProps {
  children: ReactNode;
  container: "sm" | "md" | "lg" | "xl" | "2xl";
  classes?: string;
}

export const FlexFullWidthCenter = (
  props: IFlexContainerPageFullWidthCenterProps
) => (
  <div className="w-full flex justify-center items-center">
    {props.children}
  </div>
);

export const FlexContainer = (props: IFlexContainerCenterProps) => (
  <div className={`${props.container}:container flex ${props.classes}`}>
    {props.children}
  </div>
);
