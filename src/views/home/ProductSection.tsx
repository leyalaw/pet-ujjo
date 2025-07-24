// иконки
import ScorpionIcon from "@svg/ScorpionIcon";
// компоненты
import GridContainer from "@components/Grid/GridContainer";
import GridCell from "@components/Grid/GridCell";
import ProductsList from "@/components/ProductsList/ProductsList";

type ProductId = string;
type TasteId = string;

interface ProductInfo {
  id: ProductId;
  name: string;
  tasteId: TasteId;
  image: string;
}

interface TasteInfo {
  id: TasteId;
  name: string;
}

const ProductSection: React.FC = () => {
  // захардкоренные данные продуктов
  const products: ProductInfo[] = [
    {
      id: "product-01",
      name: "Light roast blend",
      tasteId: "taste-01",
      image: "product1.png",
    },
    {
      id: "product-02",
      name: "Ujjo sampler pack",
      tasteId: "taste-02",
      image: "product2.png",
    },
    {
      id: "product-03",
      name: "Dark roast blend",
      tasteId: "taste-01",
      image: "product3.png",
    },
    {
      id: "product-04",
      name: "Light roast blend",
      tasteId: "taste-01",
      image: "product1.png",
    },
    {
      id: "product-05",
      name: "Ujjo sampler pack",
      tasteId: "taste-02",
      image: "product2.png",
    },
    {
      id: "product-06",
      name: "Dark roast blend",
      tasteId: "taste-01",
      image: "product3.png",
    },
  ];

  // захардкоренные данные вкусов
  const tastes: TasteInfo[] = [
    {
      id: "taste-01",
      name: "tangy and tingly",
    },
    {
      id: "taste-02",
      name: "light & dark roast",
    },
  ];

  const productsList: (ProductInfo & { taste: string })[] = products.map(
    (product: ProductInfo) => {
      return {
        ...product,
        id: product.id,
        taste: tastes.find((taste) => taste.id === product.tasteId)?.name || "",
      };
    }
  );

  return (
    <GridContainer tag={"section"} cols={1} rows={2}>
      {/* Заголовок */}
      <GridCell>
        <div className="w-full flex justify-between items-end lg:py-default--big">
          <ScorpionIcon className="hidden lg:block" />
          <h2 className="text-[6.5rem]/[1.1] lg:w-[60%]">
            Throw some lava in your Java
          </h2>
          <ScorpionIcon className="hidden lg:block -scale-x-[1]" />
        </div>
      </GridCell>
      {/* Список продуктов */}
      <GridCell noPx>
        <ProductsList products={productsList} />
      </GridCell>
    </GridContainer>
  );
};

export default ProductSection;
