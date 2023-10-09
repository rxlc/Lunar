import React, { useState, useEffect, useContext } from 'react'
import { Card, Image, Heading, Text, Flex, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import { CurrentQuakeContext } from './Contexts/CurrentQuakeContext'

import { motion } from 'framer-motion'

export default function QuakeDetails() {
  const quakeStyle = {
    position: "absolute",
    top: "50%",
    right: "10%",      
    transform: "translateY(-50%)",
  };

  const { currentQuake, setCurrentQuake } = useContext(CurrentQuakeContext);

  const handleBackClicked = () => {
    setCurrentQuake(null);
  }

  useEffect(() => {
    console.log(currentQuake)
  }, [currentQuake])

  return (
    <>
      { currentQuake ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card zIndex="10" style={quakeStyle} minW="250px" bg="gray.800" p="5">
              <IconButton variant='outline' colorScheme='orange' size='md' width="30px" mb="8px" icon={<ArrowBackIcon/>} onClick={handleBackClicked}/>
              <Heading fontSize="18px" my="10px" color="white">{currentQuake.formattedDate}</Heading>
              <Text color="gray.400" fontSize={"12px"}>Magnitude: {currentQuake.Magnitude}</Text>
              <Text color="gray.400" fontSize={"12px"}>Exact Time: {currentQuake.H}:{currentQuake.M}:{currentQuake.S}</Text>
              <Text color="gray.400" fontSize={"12px"}>Latitude: {currentQuake.Lat}°</Text>
              <Text color="gray.400" fontSize={"12px"}>Longitude: {currentQuake.Long}°</Text>
            </Card>
          </motion.div>
      ) : null }
    </>
  )
}
