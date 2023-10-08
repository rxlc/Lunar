import React, { useState, useEffect } from 'react'
import { Card, Image, Heading, Text, Flex, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import { motion } from 'framer-motion'

export default function Apollo() {
  const apolloStyle = {
    position: "absolute",
    top: "50%",
    right: 0,      
    transform: "translateY(-50%)",
  };

  const [jsonData, setJsonData] = useState(null);
  const [currentApollo, setCurrentApollo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/apollos/apollos.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    document.addEventListener("apolloClicked", handleApolloClicked);
  }, [jsonData]);

  const handleApolloClicked = (e) => {
    let selectedApollo = e.detail;

    if (jsonData) setCurrentApollo(jsonData[selectedApollo]);
  }

  const handleBackClicked = () => {
    setCurrentApollo(null);
  }

  return (
    <>
      { currentApollo ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card zIndex="10" style={apolloStyle} maxW="400px" bg="gray.800" p="5" mr="12px">
              <IconButton variant='outline' colorScheme='orange' size='md' width="30px" mb="8px" icon={<ArrowBackIcon/>} onClick={handleBackClicked}/>
              <Image src={currentApollo.imagePath} alt="Apollo 11" borderRadius={"md"} objectFit={"cover"} mx="auto"/>
              <Flex mt="10px" borderBottom="1px solid white"/>
              <Heading fontSize="22px" my="10px" color="white">{currentApollo.name}</Heading>
              <Text color="gray.400" fontSize={"12px"}>Launch date:	{currentApollo.launchDate}</Text>
              <Text color="gray.400" fontSize={"12px"}>Landing Date: {currentApollo.landingDate}</Text>
              <Text color="gray.400" mb="8px" fontSize={"12px"}>PSE Package Type: {currentApollo.PSE}</Text>
              <Text color="gray.400" fontSize={"14px"}>{currentApollo.description}</Text>
            </Card>
          </motion.div>
      ) : null }
    </>
  )
}
