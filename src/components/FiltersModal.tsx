import { Input } from '@chakra-ui/input'
import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/modal'
import { Select } from '@chakra-ui/select'
import React, { FC } from 'react'
import { FullCategory } from '../types'

interface FiltersModalProps {
    isOpen: boolean
    onClose: () => void
    categories: FullCategory[]
    dateFilter: string
    setDateFilter: (val: string) => void
    statusFilter: string
    setStatusFilter: (val: string) => void
    categoryFilter: string
    setCategoryFilter: (val: string) => void
}

export const FiltersModal: FC<FiltersModalProps> = ({
    isOpen,
    onClose,
    categories,
    dateFilter,
    setDateFilter,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Filters</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Date:</Text>
                    <Flex>
                        <Box>
                            <Input
                                value={dateFilter}
                                onChange={e => setDateFilter(e.target.value)}
                            />
                        </Box>
                        <Center ml="10px">last days</Center>
                    </Flex>
                    <Text>Status:</Text>
                    <Select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option></option>
                        <option value="open">open</option>
                        <option value="closed">closed</option>
                    </Select>
                    <Text>Category:</Text>
                    <Select
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                    >
                        <option></option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </Select>
                </ModalBody>

                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}
