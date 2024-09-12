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

export function MakeResult<V,E>(success: boolean, successValue: V, errorValue: E): Result<V,E> {
    if(success) {
        return Success(successValue);
    }

    return Fail(errorValue);
}

export function MakeResultFromNull<V>(successValue: V | null, errorMessage: string): Result<V, Error> {
    return MakeResult(successValue !== null, successValue as V, new Error(errorMessage));
}
