import {createAsyncThunk} from '@reduxjs/toolkit';

import {getTimeSeries} from '../../api';
import {persistentStorage} from '../../hooks/local-storage/localStorage';
import {TimeSeriesConverterData} from '../../types';

interface Params {
    startDate: string;
    endDate: string;
    base?: string;
    symbol?: string;
    key: string;
}

export const fetchTimeSeriesRatesData = createAsyncThunk(
    `timeSeriesRates/fetchData`,
    async (params: Params, {rejectWithValue}) => {
        const {base, symbol, startDate, endDate, key} = params;

        try {
            const response = await getTimeSeries<TimeSeriesConverterData>(
                startDate,
                endDate,
                base,
                symbol
            );

            const latestData = response.data;
            persistentStorage.setItem(key, latestData);

            return latestData;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
