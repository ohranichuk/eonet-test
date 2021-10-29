import axios from 'axios'
import { CategoriesResponce, EventsResponce } from '../types'
import { queryParams } from '../utils/queryParams'

const instance = axios.create({
    baseURL: 'https://eonet.sci.gsfc.nasa.gov/api/v2.1',
})

interface RequestParams {
    days?: string
    status?: string
}

export class API {
    static async getEvents(params: RequestParams = {}) {
        const response = await instance.get<EventsResponce>(
            '/events' + queryParams(params)
        )
        return response.data
    }

    static async getEventsByCategory(
        categoryId: number,
        params: RequestParams = {}
    ) {
        const response = await instance.get<EventsResponce>(
            `/categories/${categoryId}` + queryParams(params)
        )
        return response.data
    }

    static async getCategories() {
        const response = await instance.get<CategoriesResponce>('/categories')
        return response.data
    }
}
