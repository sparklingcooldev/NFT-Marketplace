import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ReactComponent as LeftArrow } from "../../assets/icons/chevron-left-solid.svg";
import { ReactComponent as RightArrow } from "../../assets/icons/chevron-right-solid.svg";
import * as Styled from "./styled.components";
import Card from "./Card";
import coll1 from "../../assets/coll-1.jpg";
import coll2 from "../../assets/coll-2.jpg";
import coll3 from "../../assets/coll-3.jpg";
import coll4 from "../../assets/coll-4.jpg";
import coll5 from "../../assets/coll-5.jpg";
import author1 from "../../assets/avatars/author-1.jpg";
import author10 from "../../assets/avatars/author-10.jpg";
import author11 from "../../assets/avatars/author-11.jpg";
import author12 from "../../assets/avatars/author-12.jpg";
import author9 from "../../assets/avatars/author-9.jpg";
import author2 from "../../assets/avatars/author-2.jpg";
import author3 from "../../assets/avatars/author-3.jpg";

// Import Swiper styles
import "swiper/css/bundle";

const SliderCarousel = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const cardData = [
    {
      id: 1,
      image: coll1,
      avatar: author1,
      title: "Pinky Ocean",
      contract: "ERC-101",
    },
    {
      id: 2,
      image: coll2,
      avatar: author10,
      title: "Deep Sea Phantasy",
      contract: "ERC-101",
    },
    {
      id: 3,
      image: coll3,
      avatar: author11,
      title: "Rainbow Style",
      contract: "ERC-101",
    },
    {
      id: 4,
      image: coll4,
      avatar: author12,
      title: "Two Tigers",
      contract: "ERC-101",
    },
    {
      id: 5,
      image: coll5,
      avatar: author9,
      title: "The Truth",
      contract: "ERC-101",
    },
    {
      id: 6,
      image: coll1,
      avatar: author2,
      title: "The Truth",
      contract: "ERC-101",
    },
    {
      id: 7,
      image: coll3,
      avatar: author3,
      title: "The Truth",
      contract: "ERC-101",
    },
  ];

  const params = {
    modules: [Navigation],
    loop: "true",
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    onBeforeInit: (swiper) => {
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
    },
    pagination: false,
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
      1200: {
        spaceBetween: 20,
        slidesPerView: 5,
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 4,
      },
      576: {
        spaceBetween: 20,
        slidesPerView: 3,
      },
    },
  };
  return (
    <Styled.Section>
      <Styled.Container>
        <Styled.Carousel>
          <Swiper {...params}>
            {cardData.map((item) => (
              <SwiperSlide key={item.id}>
                <Card {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Styled.CarouselButtons>
            <Styled.PrevButton ref={navigationPrevRef}>
              <LeftArrow width="8px" />
            </Styled.PrevButton>
            <Styled.NextButton ref={navigationNextRef}>
              <RightArrow width="8px" />
            </Styled.NextButton>
          </Styled.CarouselButtons>
        </Styled.Carousel>
      </Styled.Container>
    </Styled.Section>
  );
};

export default SliderCarousel;
