import React from "react";
import classNames from "classnames";

/* -------------------------------------------------------------------------- */
/*                          Ячейка grid-сетки проекта                         */
/* -------------------------------------------------------------------------- */

export interface GridCellProps extends React.ComponentProps<any> {
  /** Порядковый номер в сетке */
  order?: number;
  /** Сколько колонок занимает */
  colSpan?: number;
  /** Сколько рядов занимает */
  rowSpan?: number;
  /** Отключить внутренний отступ по горизонтали */
  noPx?: boolean;
  /** Отключить внутренний отступ по вертикали */
  noPy?: boolean;
  /** Корневой тег */
  tag?: string;
}

/* -------------------------------------------------------------------------- */

const GridCell: React.FC<GridCellProps> = ({
  order = 0,
  colSpan = 1,
  rowSpan = 1,
  noPx = false,
  noPy = false,
  tag = "div",
  ...props
}) => {
  return React.createElement(
    tag,
    {
      className: classNames(
        "flex flex-col justify-center items-center bg-main overflow-hidden text-center",
        {
          "px-default": !noPx,
          "py-default": !noPy,
        },
        props.className
      ),
      style: {
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        order,
      },
    },
    props.children
  );
};

export default GridCell;
