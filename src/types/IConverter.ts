type Rates = Record<string, number>;
export type TimeSeriesRates = Record<string, Rates>;

export interface LatestConverterData {
    base: string;
    date: string;
    rates: Rates;
    success: boolean;
    timestamp: number;
}

export interface TimeSeriesConverterData {
    base: string;
    end_date: string;
    rates: TimeSeriesRates;
    start_date: string;
    success: boolean;
    timeseries: boolean;
}
