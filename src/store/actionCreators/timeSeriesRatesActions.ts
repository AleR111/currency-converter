import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUnixTime} from 'date-fns';

import {getTimeSeries} from '../../api';
import {TimeSeriesConverterData} from '../../types';

interface Params {
    startDate: string;
    endDate: string;
    base?: string;
    symbol?: string;
}

export const fetchTimeSeriesRatesData = createAsyncThunk(
    `timeSeriesRates/fetchData`,
    async (params: Params, {rejectWithValue}) => {
        const {base, symbol, startDate, endDate} = params;
        const key = `${base}-${symbol}-series`;
        const local: TimeSeriesConverterData | null = JSON.parse(
            localStorage.getItem(key)
        );
        console.log("🚀 ~ file: timeSeriesRatesActions.ts ~ line 22 ~ local", local)

        const isIncludeStartDate = startDate >= local?.start_date ;

        const isIncludeEndDate = endDate <= local?.end_date;
        console.log("🚀 ~ file: timeSeriesRatesActions.ts ~ line 26 ~ isIncludeEndDate", isIncludeEndDate)
      


        if (local && isIncludeStartDate && isIncludeEndDate) return local;
        try {
            const response = await getTimeSeries<TimeSeriesConverterData>(
                startDate,
                endDate,
                base,
                symbol
            );
            console.log("🚀 ~ file: timeSeriesRatesActions.ts ~ line 42 ~ response", response)
            const latestData = response.data;
            localStorage.setItem(key, JSON.stringify(latestData));
            return latestData;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
