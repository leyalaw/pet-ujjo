import { useEffect } from "react";

/* -------------------------------------------------------------------------- */
/*             Обновление значения в зависимости от ширины экрана             */
/* -------------------------------------------------------------------------- */

/** Map с минимальными ширинами экрана и соответствующими им значениями */
export type ScreenValueConditions<T> = Map<MinScreenWidth, T>;
/** Минимальная ширина экрана */
export type MinScreenWidth = number;

/**
 * Получение функции обновления значения в зависимости от ширины экрана
 * и при необходимости добавление ее в качестве обработчика события resize
 * @param conditions - Map с минимальными ширинами экрана и соответствующими им значениями
 * @param setter - функция обновления значения
 * @param addHandler - добавить ли как обработчик события resize
 */
function useScreenResizeUpdate<T>(
  conditions: ScreenValueConditions<T>,
  setter: (value: T) => void,
  addHandler: boolean = true
): { update: () => void } {
  /** Отсортированные по возрастанию минимальные ширины экрана */
  const sortedScreenWidths = Array.from(conditions.keys()).sort(
    (a, b) => a - b
  );

  // Меняем первую минимальную ширину на 0, если нуля нет, и предупреждаем об этом
  if (sortedScreenWidths[0] !== 0) {
    conditions.set(0, conditions.get(sortedScreenWidths[0]) as T);
    conditions.delete(sortedScreenWidths[0]);

    console.warn(`
      useScreenResizeUpdate: The first screen width was set to 0.`);
  }

  /** Обновление значения в зависимости от ширины экрана */
  const update = (): void => {
    sortedScreenWidths.forEach((screenWidth) => {
      if (window.innerWidth >= screenWidth) {
        setter(conditions.get(screenWidth) as T);
        return;
      }
    });
  };

  // Добавляем обработчик события resizegi
  if (addHandler)
    useEffect(() => {
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);

  return { update };
}

export default useScreenResizeUpdate;
