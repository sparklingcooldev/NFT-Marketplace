import React from "react";
import * as Styled from "./styled.components";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart-solid.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-solid.svg";
import { useTimer } from "react-timer-hook";

const Card = (props) => {
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
    <Styled.Card>
      <Styled.Avatar>
        <Styled.AvatarImg src={props.avatar} />
        <Styled.AvatarIcon>
          <CheckIcon width="8px" />
        </Styled.AvatarIcon>
      </Styled.Avatar>
      {props.timer && (
        <Styled.Timer>
          {days}d {hours}h {minutes}m {seconds}s
        </Styled.Timer>
      )}
      <Styled.CardContent>
        <Styled.CardImage src={props.image} />
      </Styled.CardContent>
      <Styled.CardDetails>
        <Styled.Row>
          <Styled.CardTitle>{props.title}</Styled.CardTitle>
          <Styled.MenuIcon>...</Styled.MenuIcon>
        </Styled.Row>
        <Styled.Row>
          <Styled.Price>{props.price} ETH</Styled.Price>
          <Styled.Ratio>{props.ratio}</Styled.Ratio>
        </Styled.Row>
        <Styled.Row>
          <Styled.BidButton>Place a bid</Styled.BidButton>
          <Styled.Likes>
            <Styled.LikesIcon>
              <HeartIcon />
            </Styled.LikesIcon>
            <Styled.LikesCount>{props.likes}</Styled.LikesCount>
          </Styled.Likes>
        </Styled.Row>
      </Styled.CardDetails>
    </Styled.Card>
  );
};

export default Card;
