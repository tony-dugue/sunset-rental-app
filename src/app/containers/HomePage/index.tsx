import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro";

import HeroSection from "./hero";
import BookingSteps from "./bookingSteps";
import AboutUs from "./aboutUs";

import BookCard from "../../components/bookCard";
import NavBar from "../../components/navbar";
import Marginer from "../../utils/marginer";
import TopCars from "./topCars";

const HomePage = () => {
  return (
    <PageContainer>
      <NavBar />
      <HeroSection />
      <Marginer direction="vertical" margin="4em" />
      <BookCard />
      <Marginer direction="vertical" margin="10em" />
      <BookingSteps />
      <Marginer direction="vertical" margin="8em" />
      <AboutUs />
      <Marginer direction="vertical" margin="8em" />
      <TopCars />
    </PageContainer>
  )
}

export default HomePage

const PageContainer = styled.div`
  ${tw`flex flex-col w-full h-full items-center overflow-x-hidden`}
`
