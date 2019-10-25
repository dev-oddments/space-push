import styled, { keyframes } from "styled-components";
import React from "react";

const closeLeftLeg = keyframes`
  from {
    transform: rotate(-35deg) skewX(-35deg); } 
    to {
    transform: rotate(90deg) skewX(35deg); }
`;

const closeRightLeg = keyframes`
  from {
    transform: rotate(35deg) skewX(-35deg); }
  to {
    transform: rotate(-90deg) skewX(35deg); }
`;

const wiggle = keyframes`
  0% {
    left: calc(90% - 50px);
    top: calc(50% - 50px); }
  5% {
    left: calc(90% - 45px);
    top: calc(50% - 48px); }
  10% {
    left: calc(90% - 50px);
    top: calc(50% - 50px);  }
  15% {
    left: calc(90% - 45px);
    top: calc(50% - 48px); }
  20% {
    left: calc(90% - 50px);
    top: calc(50% - 50px); } 
`;

const takeoff = keyframes`
  from {
    top: calc(100% - 180px);
  }
  to {
    top: -400px; 
    display: none; 
  }
`;

const engineTurnedOn = keyframes`
  0% {
    transform-origin: top center;
    transform: scale(0); }
  50% {
    transform-origin: top center;
    transform: scale(0.5); }
  60% {
    transform-origin: top center;
    transform: scale(0.8); }
  100% {
    transform-origin: top center;
    transform: scale(1); } 
`;

const RocketTakeoff = styled.div`
  display: ${props => (props.display ? "block" : "none")};
  position: absolute;
  left: calc(90% - 50px);
  top: calc(100% - 180px);
  height: 160px;
  animation-name: ${wiggle}, none, ${takeoff};
  animation-duration: 1000ms, 500s, 2000ms;
  animation-delay: 1000ms;
  animation-iteration-count: 8, 1, 1;
  animation-timing-function: ease-out;
  animation-fill-mode: none, none, forwards;
`;

const RocketSpan = styled.span`
  display: block;
  top: 30px;
  width: 20px;
  height: 120px;
  background-color: #a7a9b1;
  position: absolute;
  border-left: 3px solid #797d88;
  border-right: 3px solid #a7a9b1;
  border-bottom: 3px solid #191919;
  box-sizing: initial;

  :after {
    content: "";
    position: absolute;
    display: block;
    left: 10px;
    width: 10px;
    height: 100%;
    background-color: #d6d8e1;
  }
`;

const RocketBow = styled.i`
  top: 100%;
  height: 60px;
  width: 26px;
  display: block;
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  background-color: #a7a9b1;
  box-sizing: border-box;
  border-left: 3px solid #797d88;

  :after {
    content: "";
    position: absolute;
    display: block;
    left: 13px;
    width: 10px;
    top: 3px;
    height: 27px;
    border-top-right-radius: 100%;
    background: linear-gradient(180deg, #a7a9b1 20%, #d6d8e1);
  }
`;

const Fin = styled.i`
  display: block;
  background-color: blue;
  width: 10px;
  height: 15px;
  position: absolute;
  top: 20px;
  background-color: #3a3a3b;
`;

const FinLeft = Fin.extend`
  border-top-left-radius: 100%;
  left: -7px;
`;

const FinRight = Fin.extend`
  border-top-right-radius: 100%;
  right: -7px;
`;

const RocketEngine = styled.i`
  width: 100%;
  height: 10px;
  bottom: 55px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  background-color: #3a3a3b;
`;

const Leg = styled.i`
  position: absolute;
  display: block;
  bottom: 25px;
  width: 35px;
  height: 7px;
  background-color: #3a3a3b;
`;

const LegLeftTakeoff = Leg.extend`
  right: 23px;
  transform-origin: right center;
  animation-name: ${closeLeftLeg};
  animation-duration: 500ms;
  animation-delay: 500ms;
  animation-fill-mode: forwards;
  transform: rotate(-35deg) skewX(-35deg);
`;

const LegRightTakeoff = Leg.extend`
  left: 23px;
  transform-origin: left center;
  animation: ${closeRightLeg};
  animation-duration: 500ms;
  animation-delay: 500ms;
  animation-fill-mode: forwards;
  transform: rotate(35deg) skewX(-35deg);
`;

const BlazeTakeoff = styled.i`
  position: absolute;
  top: 160px;
  left: -6px;
  display: block;
  background-color: #ff3d00;
  border-radius: 50% 50% 70% 70%;
  width: 40px;
  height: 60px;
  animation-name: ${engineTurnedOn};
  animation-duration: 3500ms;
  animation-delay: 0ms;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: forwards, none;
`;

const BlazeInner = styled.i`
  position: absolute;
  display: block;
  left: 5px;
  border-radius: 50% 50% 90% 90%;
`;

const BlazeInnerMedium = BlazeInner.extend`
  width: 30px;
  height: 45px;
  background-color: #ffd600;
`;

const BlazeInnerExtra = BlazeInner.extend`
  left: 12px;
  width: 15px;
  height: 30px;
  background-color: #ffff00;
`;

const SpaceshipTakeoff = ({ display, onAnimationEnd }) => (
  <RocketTakeoff display={display} onAnimationEnd={onAnimationEnd.bind(this)}>
    <LegLeftTakeoff />
    <LegRightTakeoff />
    <BlazeTakeoff>
      <BlazeInnerMedium />
      <BlazeInnerExtra />
    </BlazeTakeoff>
    <RocketSpan />
    <RocketBow />
    <FinLeft />
    <FinRight />
    <RocketEngine />
  </RocketTakeoff>
);

export { SpaceshipTakeoff };
