import { Heading, HStack, Text, VStack } from '@chakra-ui/layout'
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/modal'
import { Tag } from '@chakra-ui/tag'
import React, { FC } from 'react'
import { Event } from '../types'

interface ViewEventDrawerProps {
    isOpen: boolean
    onClose: () => void
    event: Event | null
}

export const ViewEventDrawer: FC<ViewEventDrawerProps> = ({
    event,
    isOpen,
    onClose,
}) => {
    return (
        <Drawer onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                {event ? (
                    <>
                        <DrawerHeader borderBottomWidth="1px">
                            {event.id}
                        </DrawerHeader>
                        <DrawerBody>
                            <Heading size="md">{event.title}</Heading>
                            <Text>{event.description}</Text>
                            <Text mt="5px">Categories:</Text>
                            <HStack mt="5px">
                                {event.categories.map(category => (
                                    <Tag key={category.id} colorScheme="blue">
                                        {category.title}
                                    </Tag>
                                ))}
                            </HStack>
                            <Text mt="5px">Sources:</Text>
                            <HStack mt="5px">
                                {event.sources.map(source => (
                                    <Tag key={source.id} colorScheme="blue">
                                        {source.id}
                                    </Tag>
                                ))}
                            </HStack>
                            <Text mt="5px">Geometries:</Text>
                            <VStack mt="5px">
                                {event.geometries.map(geometry => (
                                    <Tag key={geometry.date} colorScheme="blue">
                                        [{geometry.coordinates[0]},{' '}
                                        {geometry.coordinates[1]}]
                                    </Tag>
                                ))}
                            </VStack>
                        </DrawerBody>
                    </>
                ) : null}
            </DrawerContent>
        </Drawer>
    )
}
