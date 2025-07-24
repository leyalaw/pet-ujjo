import { useCallback, useEffect, useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                               Свайп слайдера                              */
/* -------------------------------------------------------------------------- */

/** Способы написания оси X */
const axisXList = ["x", "X"] as const;
/** Способы написания оси Y */
const axisYList = ["y", "Y"] as const;

/** Оси */
type Axis = (typeof axisXList)[number] | (typeof axisYList)[number];

type Props = {
  /** Максимально возможное смещение */
  end: number;
  /** Минимально возможное смещение */
  start?: number;
  /** Ось перемещения */
  axis?: Axis;
};

type Return = {
  /** Обработчики свайпа */
  onSwipe: {
    /** Обработчик нажатия мыши */
    onMouseDown: (event: React.MouseEvent) => void;
    /** Обработчик нажатия пальца */
    onTouchStart: (event: React.TouchEvent) => void;
  };
  /** Текущее смещение */
  translate: number;
};

/* -------------------------------------------------------------------------- */

/** Получение обработчика свайпа и текущего смещения */
function useSwipeSlider({ end, start = 0, axis = "x" }: Props): Return {
  /** Текущее смещение */
  const [translate, setTranslate] = useState<number>(0);
  /** Начало смещения */
  const [swipeStart, setSwipeStart] = useState<number>(0);
  /** Состояние нажатия */
  const [isDown, setIsDown] = useState<boolean>(false);

  /** Метод события мыши в зависимости от оси */
  const eventMethod = useMemo<"clientX" | "clientY">(
    () => (axisYList.includes(axis as any) ? "clientY" : "clientX"),
    [axis]
  );

  /**
   * Получение валидного смещения в зависимости от лимитов
   * @param rawTempTranslate - смещение без ограничений
   */
  const getValidTranslate = useCallback<(rawTempTranslate: number) => number>(
    (rawTempTranslate) => {
      if (end < start)
        return rawTempTranslate > start
          ? start
          : rawTempTranslate < end
          ? end
          : rawTempTranslate;
      else
        return rawTempTranslate < start
          ? start
          : rawTempTranslate > end
          ? end
          : rawTempTranslate;
    },
    [end, start]
  );

  /** Обработчик нажатия */
  const onPressStart = (event: React.MouseEvent | React.Touch): void => {
    setIsDown(true);
    setSwipeStart(translate - event[eventMethod]);
  };

  /** Обработчик движения */
  const onPressMove = (event: MouseEvent | Touch): void => {
    if (!isDown) return;

    const rawTempTranslate = swipeStart + event[eventMethod];

    setTranslate(getValidTranslate(rawTempTranslate));
  };

  /** Обработчик отпускания */
  const onPressEnd = () => setIsDown(false);

  /** Обработчик движения мыши */
  const onMouseMove = (event: MouseEvent): void => onPressMove(event);
  /** Обработчик движения пальца */
  const onTouchMove = (event: TouchEvent): void =>
    onPressMove(event.touches[0]);

  useEffect(() => {
    const removeDocumentEvents = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseup", onPressEnd);
      document.removeEventListener("touchend", onPressEnd);
    };

    if (isDown) {
      document.body.style.cursor = "grabbing";

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("mouseup", onPressEnd);
      document.addEventListener("touchend", onPressEnd);
    } else {
      document.body.style.cursor = "default";

      removeDocumentEvents();
    }

    return () => removeDocumentEvents();
  }, [isDown]);

  /* -------------------------------------------------------------------------- */

  return {
    onSwipe: {
      onMouseDown: (event: React.MouseEvent): void => {
        event.preventDefault();
        onPressStart(event);
      },
      onTouchStart: (event: React.TouchEvent): void => {
        onPressStart(event.touches[0]);
      },
    },
    translate,
  };
}

export default useSwipeSlider;
