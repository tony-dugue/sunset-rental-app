import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro";
import NavBar from "../../components/navbar";

const HomePage = () => {
  return (
    <PageContainer>
      <NavBar />
    </PageContainer>
  )
}

export default HomePage

const PageContainer = styled.div`
  ${tw`flex flex-col w-full h-full items-center overflow-x-hidden`}
`