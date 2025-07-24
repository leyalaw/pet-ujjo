import Frame from "@svg/Frame";

/* -------------------------------------------------------------------------- */
/*                              Карточка продукта                             */
/* -------------------------------------------------------------------------- */

export interface ProductsListCardProps extends React.ComponentProps<"article"> {
  /** Id */
  id: string;
  /** Название */
  name: string;
  /** Вкус */
  taste: string;
  /** Изображение */
  image: string;
  /** Альтернативный текст для изображения */
  alt?: string;
}

/* -------------------------------------------------------------------------- */

const ProductsListCard: React.FC<ProductsListCardProps> = ({
  name,
  taste,
  image,
  alt = "",
}) => {
  return (
    <article className="relative">
      <Frame className="w-full h-full" />
      <div className="absolute h-[80%] w-full bottom-0 flex flex-col justify-end items-center p-default">
        <header>
          <div className="text-[1.8rem]">{taste}</div>
          <h3 className="text-[2.4rem] lg:text-[3.2rem] mt-default--small">
            {name}
          </h3>
        </header>
        <img src={image} alt={alt || name} className="w-full" />
      </div>
    </article>
  );
};

export default ProductsListCard;
