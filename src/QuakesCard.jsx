import React, { useContext } from 'react'
import { Text, Card } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { memo } from 'react';


const QuakesCard = memo(({quake, index, handleClick}) => {
    const MotionCard = motion(Card)

    return (
        <MotionCard 
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -50 }}  
            transition={{duration: 0.5, delay: index * 0.2}} 
            layout  
            bg="gray.800" color="white" borderRadius={"2px"} borderLeft={"2px solid orange"} p="8px" pl="8px" flexFlow={"row"} 
            alignItems="flex-end" justifyContent="space-between" cursor={"pointer"}
            onClick={() => handleClick(quake)}
        >
            <Text>{quake.formattedDate.split(',')[0]}</Text>
            <Text color="gray" fontSize={"10px"}>Magnitude: {quake.Magnitude}</Text>
        </MotionCard>
    )
    },
    (next, prev) => next.quake === prev.quake
);

export default QuakesCard;