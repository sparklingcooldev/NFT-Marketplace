import HotCollectionSlider from "../components/HotCollectionSlider";

const HotCollections = () => {
  return (
    <section className="pb-20">
      <h1 className="text-4xl font-semibold text-center">Hot Collections</h1>
      <hr className="w-14 border border-purpleR mx-auto my-5" />

      <HotCollectionSlider />
    </section>
  );
};

export default HotCollections;
