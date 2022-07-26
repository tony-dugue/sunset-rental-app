import React, {Dispatch, useEffect, useState} from 'react'
import styled from 'styled-components'
import tw from "twin.macro";
import {useMediaQuery} from "react-responsive";
import {SCREENS} from "../../components/responsive";
import MoonLoader from "react-spinners/MoonLoader"

import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

//import {ICar} from "../../../typings/car";
import Car from "../../components/car";
import carService from "../../services/carService";
import {GetCars_cars} from "../../services/carService/__generated__/GetCars";

import { setTopCars } from './slice';
import {useDispatch, useSelector} from "react-redux";
import { createSelector } from 'reselect';
import {makeSelectTopCars} from "./selectors";

const actionDispatch = (dispatch: Dispatch<any>) => ({
  setTopCars: (cars: GetCars_cars[]) => dispatch(setTopCars(cars)),
});

const stateSelector = createSelector(makeSelectTopCars, topCars => ({ topCars }))

const wait = (timeout: number) => new Promise( rs => setTimeout(rs, timeout))

const TopCars = () => {

  const [current, setCurrent] = useState(0);
  const [isLoading, setLoading] = useState(false)

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm })

  const { topCars } = useSelector(stateSelector)
  const { setTopCars } = actionDispatch(useDispatch())

  const fetchTopCars = async () => {
    setLoading(true)
    const cars = await carService.getCars().catch( err => {
      console.log("Error: ", err)
    })

    await wait(5000)

    console.log("Cars: ", cars)
    if (cars) setTopCars(cars)
    setLoading(false)
  }

  useEffect(() => {
    fetchTopCars()
  }, []);


  // const testCar: ICar = {
  //   name: "Audi S3 Car",
  //   mileage: "10k",
  //   thumbnailSrc: "https://cdn.jdpower.com/Models/640x480/2017-Audi-S3-PremiumPlus.jpg",
  //   dailyPrice: 70,
  //   monthlyPrice: 1600,
  //   gearType: "Auto",
  //   gas: "Petrol",
  // };
  // const testCar2: ICar = {
  //   name: "HONDA cITY 5 Seater Car",
  //   mileage: "20k",
  //   thumbnailSrc: "https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
  //   dailyPrice: 50,
  //   monthlyPrice: 1500,
  //   gearType: "Auto",
  //   gas: "Petrol",
  // };

  const isEmptyTopCars = !topCars || topCars.length === 0;

  const cars = !isEmptyTopCars && topCars.map( car => <Car {...car} thumbnailSrc={car.thumbnailUrl} />) || []

  const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 3);

  return (
   <TopCarsContainer>

     <Title>Explore Our Top Deals</Title>

     {isLoading && (
       <LoadingContainer>
         <MoonLoader loading size={20} />
       </LoadingContainer>
     )}

     {isEmptyTopCars && !isLoading && <EmptyCars>No Cars To Show!</EmptyCars>}

     {!isEmptyTopCars && !isLoading && (
       <CarsContainer>

         <Carousel
           value={current}
           onChange={setCurrent}
           slides={cars}
           plugins={[
             "clickToChange",
             { resolve: slidesToShowPlugin, options: { numberOfSlides: 3 }},
           ]}
           breakpoints={{
             640: {
               plugins: [
                 { resolve: slidesToShowPlugin, options: { numberOfSlides: 1 }},
               ],
             },
             900: {
               plugins: [
                 { resolve: slidesToShowPlugin, options: { numberOfSlides: 2 }},
               ],
             },
           }}
         />

         <Dots value={current} onChange={setCurrent} number={numberOfDots} />

       </CarsContainer>
     )}
   </TopCarsContainer>
  )
}

export default TopCars

const TopCarsContainer = styled.div`
  ${tw`    
    max-w-screen-lg w-full
    flex flex-col items-center justify-center
    pr-4 pl-4 md:pl-0 md:pr-0 mb-10
  `}
`

const Title = styled.h1`
  ${tw`
    text-black text-2xl 
    font-extrabold
    md:text-5xl md:font-black md:leading-normal
  `};
`;

const CarsContainer = styled.div`
  ${tw`
    w-full
    flex flex-wrap justify-center
    mt-7 md:mt-10
  `};
`;

const EmptyCars = styled.div`
  ${tw`w-full flex justify-center items-center text-sm text-gray-500`};
`;

const LoadingContainer = styled.div`
  ${tw`w-full mt-9 flex justify-center items-center text-base text-black`};
`;

