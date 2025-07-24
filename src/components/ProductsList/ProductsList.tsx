// типы
import type React from "react";
import type { ScreenValueConditions } from "@helpers/useScreenResizeUpdate";
import type { ProductsListCardProps } from "./ProductsListCard";
// общее
import { useEffect, useMemo, useRef, useState } from "react";
// хелперы
import useScreenResizeUpdate from "@helpers/useScreenResizeUpdate";
import useSwipeSlider from "@helpers/useSwipeSlider";
// иконки
import FireBigIcon from "@svg/FireBigIcon";
import FireSmallIcon from "@svg/FireSmallIcon";
// компоненты
import ProductListCard from "./ProductsListCard";

/* -------------------------------------------------------------------------- */
/*                          Слайдер списка продуктов                          */
/* -------------------------------------------------------------------------- */

interface ProductListProps extends React.ComponentProps<"ul"> {
  /** Список продуктов */
  products: ProductsListCardProps[];
  /**
   * Количество видимых слайдов:
   * одно по умолчанию или в зависимости от размера экрана
   */
  slidesToShow?: number | ScreenValueConditions<number>;
}

/* -------------------------------------------------------------------------- */

const ProductList: React.FC<ProductListProps> = ({
  products,
  slidesToShow = new Map([
    [0, 1],
    [600, 1.5],
    [800, 2],
    [1000, 2.5],
    [1300, 3],
  ]),
}) => {
  /* ----------------------------------- Ref ---------------------------------- */
  /** Видимая область */
  const viewRef = useRef<HTMLDivElement>(null);
  /** Перемещающееся полотно */
  const trackRef = useRef<HTMLUListElement>(null);

  /* ---------------------------------- State --------------------------------- */
  /** Ширина видимой области */
  const [viewWidth, setViewWidth] = useState<number>(0);
  /** Ширина полотна */
  const [trackWidth, setTrackWidth] = useState<number>(0);
  /** Количество видимых слайдов, в зависимости от типа slidesToShow */
  const [currentSlidesToShow, setCurrentSlidesToShow] = useState<number>(0);

  /* ---------------------------------- Memo ---------------------------------- */
  /** Индекс последнего продукта */
  const maxProductIndex = useMemo<number>(
    () => products.length - 1,
    [products]
  );
  /** CSS ширины слайда */
  const slideWidthCss = useMemo<string>(
    () =>
      `calc(${
        viewWidth / currentSlidesToShow
      }px - var(--spacing-default) * 1.25)`,
    [currentSlidesToShow, viewWidth]
  );
  /** Максимально возможный отрицательный сдвиг */
  const minXPosition = useMemo<number>(
    () => -trackWidth + viewWidth,
    [trackWidth]
  );

  /* -------------------------------- Function -------------------------------- */
  const {
    /** Обработчик свайпа */
    onSwipe,
    /** Текущий сдвиг */
    translate,
  }: {
    onSwipe: {
      onMouseDown: (event: React.MouseEvent) => void;
      onTouchStart: (event: React.TouchEvent) => void;
    };
    translate: number;
  } = useSwipeSlider({
    end: minXPosition,
  });

  /**
   * Установка количества видимых слайдов в зависимости от размера экрана,
   * если slidesToShow - Map
   */
  let updateSlidesToShow: null | (() => void) = null;

  /** Обработчик изменения размера окна */
  const onWindowResize = (): void => {
    // установка ширины видимой области
    if (viewRef.current) setViewWidth(viewRef.current.offsetWidth);

    // установка количества видимых слайдов
    updateSlidesToShow?.();
  };

  /* -------------------------------- useEffect ------------------------------- */

  useEffect(() => {
    // установка количества видимых слайдов по умолчанию
    if (typeof slidesToShow === "number") setCurrentSlidesToShow(slidesToShow);
    // или в зависимости от размера экрана
    else {
      updateSlidesToShow = useScreenResizeUpdate<number>(
        slidesToShow,
        setCurrentSlidesToShow,
        false
      ).update;
    }

    onWindowResize();

    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  useEffect(() => {
    if (trackRef.current) setTrackWidth(trackRef.current.clientWidth);
  }, [slideWidthCss]);

  /* -------------------------------------------------------------------------- */

  return (
    <div ref={viewRef} className="overflow-hidden w-full">
      <ul
        ref={trackRef}
        {...onSwipe}
        className="inline-flex justify-start flex-nowrap gap-default px-default"
        style={{
          transform: `translateX(${translate}px)`,
        }}
      >
        {products.map((product, index) => (
          <li
            key={product.id}
            className="shrink-0 relative"
            style={{
              width: slideWidthCss,
            }}
          >
            {/* иконка начала списка */}
            {index === 0 && <FireSmallIcon className="absolute top-0 left-0" />}
            <ProductListCard {...product} />
            {/* иконка-разделитель */}
            {index !== maxProductIndex ? (
              <FireBigIcon className="absolute top-0 right-0 translate-x-[calc(50%+var(--spacing-default--small))]" />
            ) : (
              // иконка конца списка
              <FireSmallIcon className="absolute top-0 right-0" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
