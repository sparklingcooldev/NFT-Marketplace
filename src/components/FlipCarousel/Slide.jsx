import React from "react";
import { useSwiperSlide } from "swiper/react";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-solid.svg";
import * as Styled from "./styled.components";

const Slide = (props) => {
  return (
    <Styled.SlideContainer>
      <Styled.SliderImageWrapper>
        <Styled.SlideImage src={props.image} />
      </Styled.SliderImageWrapper>
      <Styled.SlideContentWrapper>
        <Styled.SlideContent>
          <Styled.Title>{props.title}</Styled.Title>
          <Styled.Author>
            <Styled.Avatar>
              <Styled.AvatarImg src={props.avatar} />
              <Styled.AvatarIcon>
                <CheckIcon width="8px" />
              </Styled.AvatarIcon>
            </Styled.Avatar>
            <Styled.AuthorInfo>
              <Styled.AuthorName>{props.authorName}</Styled.AuthorName>
              <Styled.AuthorUsername>
                {props.authorUsername}
              </Styled.AuthorUsername>
            </Styled.AuthorInfo>
          </Styled.Author>
          <Styled.Row>
            <Styled.BidDetails>
              <Styled.SubScriptItem>Current Bid</Styled.SubScriptItem>
              <Styled.Price>{props.price} ETH</Styled.Price>
              <Styled.SubScriptItem>(${props.usd})</Styled.SubScriptItem>
            </Styled.BidDetails>
            <Styled.AuctionDetails>
              <Styled.SubScriptItem>Auction end in</Styled.SubScriptItem>
              <Styled.Timer>{props.time}</Styled.Timer>
              <Styled.SubScriptItem>({props.auctionDate})</Styled.SubScriptItem>
            </Styled.AuctionDetails>
          </Styled.Row>
          <Styled.Row>
            <Styled.BidButton>Place a bid</Styled.BidButton>
            <Styled.ArtworkButton>View artwork</Styled.ArtworkButton>
          </Styled.Row>
        </Styled.SlideContent>
      </Styled.SlideContentWrapper>
    </Styled.SlideContainer>
  );
};

export default Slide;
