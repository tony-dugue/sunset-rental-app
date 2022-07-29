import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro";

import NavBar from "../../components/navbar";
import HeroSection from "./hero";
import BookCard from "../../components/bookCard";
import Marginer from "../../utils/marginer";

const HomePage = () => {
  return (
    <PageContainer>
      <NavBar />
      <HeroSection />
      <Marginer direction="vertical" margin="4em" />
      <BookCard />
    </PageContainer>
  )
}

export default HomePage

const PageContainer = styled.div`
  ${tw`flex flex-col w-full h-full items-center overflow-x-hidden`}
`
