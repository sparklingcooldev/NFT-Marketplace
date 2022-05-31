import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFlip } from "swiper";
import { connect } from "react-redux";
import { loadAllMedia } from '../../redux/actions/MediaAction';
import { useTimer } from "react-timer-hook";
import { ReactComponent as LeftArrow } from "../../assets/icons/chevron-left-solid.svg";
import { ReactComponent as RightArrow } from "../../assets/icons/chevron-right-solid.svg";
import * as Styled from "./styled.components";
import Slide from "./Slide";
import crs1 from "../../assets/crs-1.jpg";
import crs5 from "../../assets/crs-5.jpg";
import crs8 from "../../assets/crs-8.jpg";
import author1 from "../../assets/avatars/author-1.jpg";
import author4 from "../../assets/avatars/author-4.jpg";
import author5 from "../../assets/avatars/author-5.jpg";

// Import Swiper styles
import "swiper/css/bundle";

const FlipCarousel = ({ loadAllMedia, medias, chainId }) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [slidesData, setSlidesData] = useState([])

  useEffect(() => {
    loadAllMedia(chainId);
  }, [chainId])

  useEffect(() => {
    if (!medias) return;
    let temp = [];
    for (let i = 0; i < medias.length; i++) {
      temp[i] = {
        id: i + 1,
        title: medias[i].metadata.title,
        image: medias[i].media_url,
        avatar: medias[i].owner_address.avatar,
        authorName: medias[i].owner_address.username,
        authorUsername: medias[i].owner_address.username,
        price: medias[i].metadata.price,
        usd: medias[i].metadata.price * 0.03,
        auctionDate: "November 16, 2021"
      }
    }
    setSlidesData(temp);
  }, [medias])

  const params = {
    modules: [Navigation, EffectFlip],
    loop: true,
    effect: "flip",
    flipEffect: {
      slideShadows: false,
    },
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
  };

  const today = new Date();
  const { seconds, minutes, hours, days, restart } = useTimer({
    expiryTimestamp: new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      today.getDate()
    ),
    onExpire: (e) =>
      restart(
        new Date(today.getFullYear(), today.getMonth() + 2, today.getDate())
      ),
  });

  return (
    <Styled.Section>
      <Styled.Container>
        <Styled.Carousel>
          <Swiper {...params}>
            {slidesData.map((item) => (
              <SwiperSlide key={item.id}>
                <Slide
                  {...item}
                  time={`${days}d ${hours}h ${minutes}m ${seconds}s`}
                />
              </SwiperSlide>
            ))}
            <Styled.CarouselButtons>
              <Styled.PrevButton ref={navigationPrevRef}>
                <LeftArrow width="9px" />
              </Styled.PrevButton>
              <Styled.NextButton ref={navigationNextRef}>
                <RightArrow width="9px" />
              </Styled.NextButton>
            </Styled.CarouselButtons>
          </Swiper>
        </Styled.Carousel>
      </Styled.Container>
    </Styled.Section>
  );
};

const fromStore = (store) => {
  return {
    medias: store.MediaReducer.medias,
  }
}

export default connect(fromStore, { loadAllMedia })(FlipCarousel);