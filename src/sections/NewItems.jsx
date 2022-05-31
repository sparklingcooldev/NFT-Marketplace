import SliderCarousel from "../components/SliderCarousel";

const NewItems = () => {
  return (
    <section className="pb-20 pt-10">
      <h1 className="text-4xl font-semibold text-center">New Items</h1>
      <hr className="w-14 border border-purpleR mx-auto my-5" />

      <SliderCarousel />
    </section>
  );
};

export default NewItems;
