export enum RequestMethod {
    Post = 'POST',
}

export enum StatusCode {
    NoContent = 204,
}

export type RequestData = {
    url: string;
    method: RequestMethod,
    body?: any,
    headers?: { [key: string]: string },
    query?: { [key: string]: string }
};

export type ResponseData<T> = {
    status: StatusCode,
    data: T,
    headers: Headers,
};

export async function sendHttpRequest<T>(req: RequestData)
    : Promise<ResponseData<T>> {
    const data: {
        method: RequestMethod,
        body?: string,
        headers: Headers,
        credentials: 'include',
    } = {
        method: req.method,
        credentials: 'include',
        headers: new Headers(),
    };

    if (req.body) {
        data.body = JSON.stringify(req.body);
        data.headers?.append('Content-Type', 'application/json');
    }

    if (req?.headers) {
        Object.keys(req.headers).forEach((k) => {
            const header = req?.headers?.[k];
            if (!header) return;

            data.headers?.append(k, header);
        });
    }

    const url = req.query ? `${req.url}?${new URLSearchParams(req.query)}` : req.url

    const res = await fetch(url, data);
    const response = res.status === StatusCode.NoContent
        ? undefined
        : await res.json();

    return {
        status: res.status,
        headers: res.headers,
        data: response,
    };
}
