import { Button } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Tag } from '@chakra-ui/tag'
import React, { FC } from 'react'
import { Event, SortField } from '../types'

interface MainTableProps {
    events: Event[]
    sortBy: SortField
    sortAsc: boolean
    onOpenFilter: () => void
    onSortCategory: () => void
    onViewEvent: (event: Event) => void
}

export const MainTable: FC<MainTableProps> = ({
    events,
    sortBy,
    sortAsc,
    onOpenFilter,
    onSortCategory,
    onViewEvent,
}) => {
    return (
        <Table variant="striped">
            <Thead>
                <Tr>
                    <Th>
                        <Button onClick={onOpenFilter}>Filter</Button>
                    </Th>
                    <Th>Id</Th>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th cursor="pointer" onClick={onSortCategory}>
                        Categories{' '}
                        {sortBy === 'category'
                            ? `sorted ${sortAsc ? 'ASC' : 'DESC'}`
                            : ''}{' '}
                    </Th>
                    <Th>Sources</Th>
                    <Th />
                </Tr>
            </Thead>
            <Tbody>
                {events.map(event => (
                    <Tr key={event.id}>
                        <Td>
                            {event.closed ? (
                                <Tag colorScheme="red">CLOSED</Tag>
                            ) : (
                                <Tag colorScheme="green">OPEN</Tag>
                            )}
                        </Td>
                        <Td>{event.id}</Td>
                        <Td>{event.title}</Td>
                        <Td>{event.description}</Td>
                        <Td>
                            <HStack>
                                {event.categories.map(category => (
                                    <Tag key={category.id} colorScheme="blue">
                                        {category.title}
                                    </Tag>
                                ))}
                            </HStack>
                        </Td>
                        <Td>
                            <HStack>
                                {event.sources.map(source => (
                                    <Tag key={source.id} colorScheme="blue">
                                        {source.id}
                                    </Tag>
                                ))}
                            </HStack>
                        </Td>
                        <Td>
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                onClick={() => onViewEvent(event)}
                            >
                                View
                            </Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}
