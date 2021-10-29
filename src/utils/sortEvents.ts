import { Event, SortField } from '../types'

export function sortEvents(
    events: Event[],
    field: SortField,
    asc: boolean
): Event[] {
    switch (field) {
        case 'date':
            return events
        case 'status':
            return events.sort((f, s) => -(!f.closed ? 1 : !s.closed ? -1 : 0))
        case 'category':
            return events.sort(
                (f, s) =>
                    -f.categories[0].title.localeCompare(s.categories[0].title)
            )

        default:
            return events
    }
}
