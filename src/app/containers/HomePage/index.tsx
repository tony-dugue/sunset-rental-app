import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro";

import NavBar from "../../components/navbar";
import HeroSection from "./hero";
import BookCard from "../../components/bookCard";

const HomePage = () => {
  return (
    <PageContainer>
      <NavBar />
      <HeroSection />
      <BookCard />
    </PageContainer>
  )
}

export default HomePage

const PageContainer = styled.div`
  ${tw`flex flex-col w-full h-full items-center overflow-x-hidden`}
`
