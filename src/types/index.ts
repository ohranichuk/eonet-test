export type SortField = 'date' | 'status' | 'category' | null

export interface Category {
    id: number
    title: string
}

export interface Source {
    id: string
    url: string
}

export interface Geometry {
    date: string
    type: string
    coordinates: [number, number]
}

export interface Event {
    id: string
    title: string
    description: string
    link: string
    categories: Category[]
    sources: Source[]
    geometries: Geometry[]
    closed?: string
}

export interface EventsResponce {
    title: string
    description: string
    link: string
    events: Event[]
}

export interface FullCategory {
    id: number
    title: string
    description: string
    link: string
    layers: string
}

export interface CategoriesResponce {
    title: string
    description: string
    link: string
    categories: FullCategory[]
}
