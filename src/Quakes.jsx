import React, { useState, useEffect, useContext } from 'react'

import { Card, HStack, Heading, Text, IconButton, Flex, Stack } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

import QuakesCard from './QuakesCard'

import { AnimatePresence } from 'framer-motion'

import { ExperienceContext } from './Contexts/ExperienceContext'
import { CurrentQuakeContext } from './Contexts/CurrentQuakeContext'

export default function Quakes() {
    const [quakes, setQuakes] = useState(null);
    const [data, setData] = useState(null);
    const [currentYear, setCurrentYear] = useState(1971);

    const { experience } = useContext(ExperienceContext);
    const { setCurrentQuake } = useContext(CurrentQuakeContext);

    const quakesStyle = {
        position: "absolute",
        top: "15%",           
        left: 0,     
        zIndex: 10,     
    };

    useEffect(() => {
        async function fetchData() {
            try {
              const response = await fetch('/moonquake_data/Nakamura79.json');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setData(data);
            } catch (error) {
              console.error('Error fetching JSON data:', error);
            }
        }
      
        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            for (let i=0; i < data.length; i++) {
                data[i].formattedDate = addFormattedDate(data[i].Year, data[i].Day);
            }
            setQuakes(data);
        }
    }, [data])

    useEffect(() => {
        //console.log(quakes)
    }, [quakes])

    function addFormattedDate(year, dayOfYear) {
        const date = new Date(year, 0, 1);
        date.setDate(dayOfYear);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
      
        return formattedDate;
    }

    function handleClick(quake) {
        if (experience) {
            experience.world.pointsList.focus(quake.Lat, quake.Long)
        }
        setCurrentQuake(quake);
    }

    useEffect(() => {
        //console.log(currentYear)
        setCurrentQuake(null);
        if (experience) {
            let inputWaves = quakes.filter(quake => quake.Year === currentYear);
            experience.world.setWaves(inputWaves);
        }
    }, [currentYear])

    return (
        <Card style={quakesStyle} ml="12px" p="8px" background="transparent">
            <HStack alignItems={"flex-start"}>
                <Heading size="mg" mb="20px" color="white">YEAR</Heading>
                <Heading size="xl" mb="20px" color="white">{currentYear}</Heading>
                <IconButton ml="20px" aria-label="Previous Year" icon={<ArrowBackIcon/>} backgroundColor={"#212529"} color="white" _hover={{"backgroundColor": "#343a40"}} isDisabled={currentYear <= 1971} onClick={() => setCurrentYear(currentYear - 1)} />
                <IconButton aria-label="Next Year" icon={<ArrowForwardIcon/>} backgroundColor={"#212529"} color="white" _hover={{"backgroundColor": "#343a40"}} isDisabled={currentYear >= 1976 } onClick={() => setCurrentYear(currentYear + 1)} />
            </HStack>
            <Text color="white" fontWeight={"semibold"} fontSize={"14px"}>MOONQUAKES:</Text>
            <Flex borderBottom="1px solid white" mb="10px"/>
            <AnimatePresence>
                <Stack spacing={"3"}>
                {quakes &&
                quakes.filter(quake => quake.Year === currentYear).map((quake, index) => <QuakesCard key={index} quake={quake} index={index} handleClick={handleClick}/>)}
                </Stack>
            </AnimatePresence>
        </Card>
    )
}