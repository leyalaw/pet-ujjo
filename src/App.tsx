import GridContainer from "@components/Grid/GridContainer.tsx";
import Header from "@layout/Header.tsx";
import Footer from "@layout/Footer.tsx";
import HeroSection from "@home/HeroSection.tsx";
import ProductsSection from "@home/ProductSection.tsx";
import StorySection from "@home/StorySection.tsx";

const App = () => {
  return (
    <div className="w-full bg-main overflow-hidden px-default uppercase tracking-default">
      <GridContainer
        tag="div"
        cols={1}
        rows={5}
        className="max-w-container border border-content--primary mx-auto"
      >
        <Header />
        <GridContainer tag="main" className="text-content--primary">
          <HeroSection />
          <ProductsSection />
          <StorySection />
        </GridContainer>
        <Footer />
      </GridContainer>
    </div>
  );
};

export default App;
