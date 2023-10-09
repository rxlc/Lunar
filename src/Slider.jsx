import React, { useEffect, useState, useContext } from 'react'

import { Box, Slider, SliderTrack, Heading, SliderFilledTrack, SliderThumb, SliderMark } from '@chakra-ui/react'

import { ExperienceContext } from './Contexts/ExperienceContext';

export default function SliderV() {
    const sliderStyle = {
        position: "absolute",
        bottom: 0, 
        right: 0, 
        zIndex: 16
    };

    const { experience } = useContext(ExperienceContext);

    const [sliderVal, setSliderVal] = useState(0);

    useEffect(() => {
        if (experience) {
            experience.world.setSpeed(sliderVal);
        }
    }, [sliderVal]);

    return (
        <Box p="8" style={sliderStyle} minWidth="400px">
            <Heading fontSize="14px" mb="10px" color="white">Set Rotation Speed</Heading>
            <Slider onChange={(val) => setSliderVal(val)} defaultValue={0} min={0} max={10} step={1}>
                <SliderTrack bg='red.100'>
                    <Box position='relative' right={10} />
                    <SliderFilledTrack bg='tomato' />
                </SliderTrack>
                <SliderMark value={0} color="white" mt='2' ml='-2.5' fontSize='sm'>
                    0
                </SliderMark>
                <SliderMark value={5} color="white" mt='2' ml='-2.5' fontSize='sm'>
                    5
                </SliderMark>
                <SliderMark value={10} color="white" mt='2' ml='-2.5' fontSize='sm'>
                    10
                </SliderMark>
                <SliderThumb boxSize={6} />
            </Slider>
        </Box>
    )
}