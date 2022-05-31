import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  position: relative;
  max-width: 500px;
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media only screen and (min-width: 360px) {
    max-width: 360px;
  }

  @media only screen and (min-width: 576px) {
    max-width: 540px;
  }

  @media only screen and (min-width: 768px) {
    max-width: 720px;
  }

  @media only screen and (min-width: 992px) {
    max-width: 960px;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 1090px;
  }
  @media only screen and (min-width: 1280px) {
    max-width: 1240px;
  }

  @media only screen and (min-width: 1400px) {
    max-width: 1260px;
  }
  @media only screen and (min-width: 1536px) {
    max-width: 1520px;
  }
`;

export const Carousel = styled.div`
  width: 95%;
`;

export const CarouselButtons = styled.div`
  width: 100%;
`;

export const NextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: #1a1a25;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  color: #fff;
  background: #1a1a25;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
  z-index: 1;
  position: absolute;
  top: 50%;
  right: 1.75%;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 25px 1px rgba(0, 0, 0, 0.25);
  }
  &::after {
    display: none;
  }
`;

export const PrevButton = styled(NextButton)`
  left: 1.75%;
`;
