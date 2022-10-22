import {exchangeRequests} from './request';

export const getLatest = <T>(base: string, symbol: string) =>
    exchangeRequests.get<T>(`latest?symbols=${symbol}&base=${base}`);

export const getTimeSeries = <T>(
    startDate: string,
    endDate: string,
    base?: string,
    symbol?: string
) => {
    const optionPoint = [
        base ? `&base=${base}` : '',
        symbol ? `&symbols=${symbol}` : '',
    ].join('');
    return exchangeRequests.get<T>(
        `/timeseries?start_date=${startDate}&end_date=${endDate}${optionPoint}`
    );
};
