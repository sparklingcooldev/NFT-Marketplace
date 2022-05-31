import FlipCarousel from "../components/FlipCarousel";

const Hero = ({ chainId }) => {
  return (
    <section className="pb-5 bg-hero bg-center bg-cover bg-no-repeat relative">
      <FlipCarousel chainId={chainId} />
    </section>
  );
};

export default Hero;
