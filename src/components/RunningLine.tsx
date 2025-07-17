import React from "react";

/* -------------------------------------------------------------------------- */
/*                               Бегущая строка                               */
/* -------------------------------------------------------------------------- */

interface RunningLineProps extends React.ComponentProps<any> {
  /** Расстояние между элементами строки */
  gap?: string;
  /** Скорость движения */
  duration?: string;
}

/* -------------------------------------------------------------------------- */

const RunningLine: React.FC<RunningLineProps> = ({
  gap = "5rem",
  duration = "2000ms",
  ...props
}) => {
  if (!props.children) return null;

  const line = [];

  let i = 0;

  while (i < 10) {
    line.push(
      <li
        key={i}
        className="inline-flex grow animate-runningline"
        style={{ animationDuration: duration, paddingRight: gap, gap }}
      >
        {props.children}
      </li>
    );
    i++;
  }

  return (
    <div className="overflow-hidden text-left text-[1.7rem]/[2.1]">
      <ul className="flex flex-nowrap">{line}</ul>
    </div>
  );
};

export default RunningLine;
