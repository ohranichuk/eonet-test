export function queryParams(obj: Object): string {
    const entries = Object.entries(obj)

    if (entries.length === 0) {
        return ''
    } else {
        return (
            '?' +
            entries
                .map(([param, value]) => {
                    return `${param}=${value}`
                })
                .join('&')
        )
    }
}
