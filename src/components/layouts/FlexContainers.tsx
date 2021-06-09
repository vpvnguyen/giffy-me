import { ReactNode } from "react";
import classnames from "classnames";

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
  <div className="flex items-center justify-center w-full">
    {props.children}
  </div>
);

export const FlexContainer = (props: IFlexContainerCenterProps) => {
  const classNames = classnames(
    "flex",
    {
      "sm:container": props.container === "sm",
      "md:container": props.container === "md",
      "lg:container": props.container === "lg",
      "xl:container": props.container === "xl",
      "2xl:container": props.container === "2xl",
    },
    props.classes
  );

  return <div className={classNames}>{props.children}</div>;
};
