import React from "react";

/* -------------------------------------------------------------------------- */
/*                             Grid сетка проекта                             */
/* -------------------------------------------------------------------------- */

interface GridContainerProps extends React.ComponentProps<any> {
  /** Количество колонок */
  cols?: number;
  /** Количество строк */
  rows?: number;
  /** Корневой тег */
  tag?: string;
  /** Дочерние элементы */
  children: React.ReactElement | React.ReactElement[];
}

/* -------------------------------------------------------------------------- */

const GridContainer: React.FC<GridContainerProps> = ({
  cols = 1,
  rows = 1,
  tag = "div",
  children,
  ...props
}) => {
  return React.createElement(
    tag,
    {
      className:
        "flex flex-col lg:grid overflow-hidden gap-px bg-content--primary " +
        (props.className || ""),
      style: {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, auto)`,
      },
    },
    children
  );
};

export default GridContainer;
