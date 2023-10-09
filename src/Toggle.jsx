import React, { useState, useContext, useEffect } from 'react'

import { Button, Stack, Card, Heading } from '@chakra-ui/react'

import { ExperienceContext } from './Contexts/ExperienceContext'

export default function Toggle() {
    const { experience } = useContext(ExperienceContext)

    const [apollo, setApollo] = useState(true)
    const [mountains, setMountains] = useState(true)
    const [oceans, setOceans] = useState(true)

    const toggleStyle = {
        position: "absolute",
        bottom: 0,
        left: 0, 
        zIndex: 12
    } 

    useEffect(() => {
        if (experience) {
            experience.world.pointsList.toggle({"apollo": apollo, "apolloAlt": apollo, "mountain": mountains, "ocean": oceans})
        }
    }, [apollo, mountains, oceans])

    return (
    <Card style={toggleStyle} ml="12px" mb="20px" minW="200px" p="10px" py="20px" backgroundColor={"transparent"} borderTop={"1px solid gray"} borderBottom={"1px solid gray"} borderRadius={"20px"}>
        <Heading size="sm" mb="20px" color="white">Toggle Landmarks:</Heading>
        <Stack spacing={"2"}>
            {/*<Button colorScheme="orange" size="sm" variant="outline" onClick={() => setApollo(!apollo)} backgroundColor={apollo ? "white" : "transparent"}>Apollo Stations</Button>*/}
            <Button colorScheme="teal" size="sm" variant="outline" onClick={() => setMountains(!mountains)} backgroundColor={mountains ? "white" : "transparent"}>Mountains</Button>
            <Button colorScheme="purple" size="sm" variant="outline" onClick={() => setOceans(!oceans)} backgroundColor={oceans ? "white" : "transparent"}>Oceans</Button>
        </Stack>
    </Card>
    )
}
