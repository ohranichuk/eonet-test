import { useDisclosure } from '@chakra-ui/hooks'
import { Box } from '@chakra-ui/layout'
import React, { useCallback, useState } from 'react'
import { API } from './api'
import { FiltersModal } from './components/FiltersModal'
import { MainTable } from './components/MainTable'
import { ViewEventDrawer } from './components/ViewEventDrawer'
import { useRequest } from './hooks/useRequest'
import { Event, SortField } from './types'
import { sortEvents } from './utils/sortEvents'

interface SortState {
    by: SortField
    asc: boolean
}

function App() {
    const {
        isOpen: isOpenDrawer,
        onOpen: onOpenDrawer,
        onClose: onCloseDrawer,
    } = useDisclosure()
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure()
    const [openedEvent, setOpenedEvent] = useState<Event | null>(null)
    const [sort, setSort] = useState<SortState>({ by: null, asc: true })
    const [dateFilter, setDateFilter] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<string>('')
    const [categoryFilter, setCategoryFilter] = useState<string>('')

    const requestCategories = useCallback(() => {
        return API.getCategories()
    }, [])

    const requestEvents = useCallback(() => {
        const paramsObj: { days?: string; status?: string } = {}
        if (dateFilter) {
            paramsObj.days = dateFilter
        }
        if (statusFilter) {
            paramsObj.status = statusFilter
        }
        if (categoryFilter) {
            return API.getEventsByCategory(
                Number.parseInt(categoryFilter),
                paramsObj
            )
        } else {
            return API.getEvents(paramsObj)
        }
    }, [categoryFilter, dateFilter, statusFilter])

    const {
        data: categoriesData,
        error: categoriesError,
        isLoading: isCategoriesLoading,
    } = useRequest(requestCategories)

    const {
        data: eventsData,
        error: eventsError,
        isLoading: isEventsLoading,
    } = useRequest(requestEvents)

    if (isCategoriesLoading || isEventsLoading) {
        return <Box>Loading...</Box>
    }

    if (categoriesError || eventsError || !categoriesData || !eventsData) {
        return (
            <Box>
                <code>
                    {JSON.stringify(categoriesError || eventsError, null, 4)}
                </code>
            </Box>
        )
    }

    const events = [...sortEvents(eventsData.events, sort.by, sort.asc)]

    return (
        <>
            <MainTable
                events={events}
                sortBy={sort.by}
                sortAsc={sort.asc}
                onOpenFilter={onOpenModal}
                onSortCategory={() => {
                    setSort(prevSort => {
                        if (prevSort.by === 'category') {
                            return {
                                ...prevSort,
                                asc: !prevSort.asc,
                            }
                        } else {
                            return { by: 'category', asc: true }
                        }
                    })
                }}
                onViewEvent={event => {
                    setOpenedEvent(event)
                    onOpenDrawer()
                }}
            />

            <ViewEventDrawer
                isOpen={isOpenDrawer}
                onClose={onCloseDrawer}
                event={openedEvent}
            />

            <FiltersModal
                isOpen={isOpenModal}
                onClose={onCloseModal}
                categories={categoriesData.categories}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
            />
        </>
    )
}

export default App
