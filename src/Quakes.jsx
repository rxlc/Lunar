import React, { useState, useEffect } from 'react'

import { Card, HStack, Heading, Text, IconButton, Flex, Stack } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

import QuakesCard from './QuakesCard'

import { AnimatePresence } from 'framer-motion'

export default function Quakes() {
    const [quakes, setQuakes] = useState(null);
    const [data, setData] = useState(null);
    const [currentYear, setCurrentYear] = useState(1971);

    const quakesStyle = {
        position: "absolute",
        top: "20%",           
        left: 0,          
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
        console.log(quakes)
    }, [quakes])

    function addFormattedDate(year, dayOfYear) {
        const date = new Date(year, 0, 1);
        date.setDate(dayOfYear);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
      
        return formattedDate;
    }

    return (
        <Card style={quakesStyle} ml="12px" p="8px" background="transparent">
            <HStack>
                <Heading size="mg" mb="20px" color="white">YEAR</Heading>
                <Heading size="xl" mb="20px" color="white">{currentYear}</Heading>
                <IconButton aria-label="Previous Year" icon={<ArrowBackIcon/>} isDisabled={currentYear <= 1971} onClick={() => setCurrentYear(currentYear - 1)} />
                <IconButton aria-label="Next Year" icon={<ArrowForwardIcon/>} isDisabled={currentYear >= 1976 } onClick={() => setCurrentYear(currentYear + 1)} />
            </HStack>
            <Text color="white" fontWeight={"semibold"} fontSize={"14px"}>MOONQUAKES:</Text>
            <Flex borderBottom="1px solid white" mb="10px"/>
            <AnimatePresence>
                <Stack spacing={"3"}>
                {quakes &&
                quakes.filter(quake => quake.Year === currentYear).map((quake, index) => <QuakesCard key={index} quake={quake} index={index}/>)}
                </Stack>
            </AnimatePresence>
        </Card>
    )
}