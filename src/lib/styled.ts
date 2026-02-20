import { cssInterop } from "nativewind";
import React, { forwardRef } from "react";

export function styled<T extends React.ComponentType<any>>(
  Component: T,
  baseClassName?: string
) {
  cssInterop(Component, {
    className: {
      target: "style",
      nativeStyleToProp: {
        backgroundColor: "backgroundColor",
        color: "color",
        borderColor: "borderColor",
      },
    },
  });

  return forwardRef((props: any, ref) => {
    return React.createElement(Component, {
      ...props,
      className: `${baseClassName || ""} ${props.className || ""}`,
      ref,
    });
  });
}
