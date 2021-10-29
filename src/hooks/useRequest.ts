import { useEffect, useState } from 'react'

export function useRequest<T>(request: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        request()
            .then(newData => setData(newData))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
    }, [request])

    return {
        data,
        error,
        isLoading,
    }
}
