export type Result<V, E> = {
    success: true
    value: V,
} | {
    success: false,
    error: E
}

export function Success<V,E>(value: V): Result<V, E> {
    return {
        success: true,
        value: value
    }
}

export function Fail<V,E>(error: E): Result<V, E> {
    return {
        success: false,
        error: error,
    }
}
