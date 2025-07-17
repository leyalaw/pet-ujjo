import GridCell from "@components/Grid/GridCell";
import GridContainer from "@components/Grid/GridContainer";
import RunningLine from "@components/RunningLine";
import PepperIcon from "@svg/PepperIcon";
import Wordmark from "@svg/Wordmark";

const HeroSection: React.FC = () => {
  return (
    <GridContainer tag="section" cols={2} rows={10}>
      {/* Словесный знак */}
      <GridCell order={-1} rowSpan={4}>
        <Wordmark />
      </GridCell>

      {/* Бегущая строка */}
      <GridCell order={3} noPx>
        <RunningLine>
          <span className="text-nowrap">put some fire in your belly</span>
          <PepperIcon />
        </RunningLine>
      </GridCell>

      {/* Изображение продукта */}
      <GridCell order={4} rowSpan={5}>
        <img src="img1.jpg" alt="" />
      </GridCell>

      {/* Заголовок */}
      <GridCell order={1} rowSpan={2}>
        <h1 className="w-[90%] text-[5.8rem]/[1.1] text-shadow-(--heading-text-shadow)">
          The first hot sauce made for coffee
        </h1>
      </GridCell>

      {/* Изображение продукта крупным планом */}
      <GridCell order={2} rowSpan={8}>
        <img src="img2.jpg" alt="" />
      </GridCell>
    </GridContainer>
  );
};

export default HeroSection;
