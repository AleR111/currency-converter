import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    CreateAxiosDefaults,
} from 'axios';

class Requests {
    private request: AxiosInstance;

    constructor(baseURL: string, config?: CreateAxiosDefaults) {
        this.request = axios.create({
            baseURL,
            ...config,
        });
    }

    get<T>(url: string, config?: AxiosRequestConfig) {
        return this.request.get<T>(url, config);
    }

    post<T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.request.post<T>(url, data, config);
    }

    put<T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.request.put<T, D>(url, data, config);
    }
}

const converterApikey = 'MmgM80dkk7ML2UJuZSYWTMfDeUZ0IUnp';

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {apikey: converterApikey},
};

export const exchangeRequests = new Requests(
    'https://api.apilayer.com/exchangerates_data',
    requestOptions
);
