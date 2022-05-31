import styled from "styled-components";

export const Section = styled.section`
  padding-top: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
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

export const SlideContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

export const SliderImageWrapper = styled.div`
  width: 100%;
  @media only screen and (min-width: 992px) {
    margin-right: 20px;
    width: 50%;
  }
`;

export const SlideImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export const SlideContentWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
  @media only screen and (min-width: 992px) {
    width: 50%;
    padding-left: 30px;
    padding-top: 0px;
  }
`;

export const SlideContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Title = styled.h2`
  display: inline-block;
  font-size: 48px;
  line-height: 60px;
  margin-bottom: 20px;
  font-weight: 700;
  color: #fff;
  text-align: left;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 30px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthorName = styled.span`
  margin-bottom: 5px;
  color: white;
  font-weight: 700;
`;

export const AuthorUsername = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #a2a2a2;
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  background: #1a1a25;
  position: relative;
  margin-right: 20px;
`;

export const AvatarImg = styled.img`
  border-radius: 50%;
  width: 100%;
  transition: 0.1s ease-in;

  &:hover {
    transform: scale(0.875);
  }
`;

export const AvatarIcon = styled.span`
  width: 15px;
  height: 15px;
  position: absolute;
  border-radius: 50%;
  right: 0;
  bottom: 5px;
  color: white;
  background: #c5269d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const BidDetails = styled.div``;

export const AuctionDetails = styled.div`
  margin-left: 40px;
  padding-left: 40px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
`;

export const SuperScriptItem = styled.span`
  color: #a2a2a2;
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
  text-align: left;
`;

export const Price = styled.span`
  font-weight: 500;
  font-size: 24px;
  color: white;
  display: block;
  margin: 10px 0;
  text-align: left;

  @media only screen and (min-width: 1200px) {
    font-size: 32px;
  }
`;

export const Timer = styled.div`
  background: -webkit-linear-gradient(#c5269d, #8505ab);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  padding: 10px 5px;
  font-size: 24px;
  font-weight: bold;

  @media only screen and (min-width: 1200px) {
    font-size: 32px;
  }
`;

export const SubScriptItem = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 15px;
  font-weight: 500;
  display: block;
  text-align: left;
  margin: 5px 0;
`;

export const BidButton = styled.button`
  border: none;
  outline: none;
  padding: 8px 40px;
  border-radius: 30px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  background: linear-gradient(217deg, #c5269d, #8505ab 75%);
  margin: 30px 5px 10px 0;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 25px -10px #c5269d;
  }
`;

export const ArtworkButton = styled(BidButton)`
  background: rgba(255, 255, 255, 0.2);
  margin: 30px 0px 10px 5px;
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
  background-color: #161d30;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 45px;
  height: 45px;
  color: #fff;
  background: #161d30;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
  position: absolute;
  top: 25%;
  right: -3%;
  z-index: 99;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 25px 1px rgba(0, 0, 0, 0.25);
  }
  &::after {
    display: none;
  }

  @media only screen and (min-width: 992px) {
    top: 45%;
    right: -1.75%;
  }
`;

export const PrevButton = styled(NextButton)`
  left: -3%;
  @media only screen and (min-width: 992px) {
    left: -1.75%;
  }
`;
