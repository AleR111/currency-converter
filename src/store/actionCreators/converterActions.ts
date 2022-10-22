import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUnixTime} from 'date-fns';

import {getLatest} from '../../api';
import {LatestConverterData} from '../../types';

interface Params {
    base: string;
    symbol: string;
}

export const fetchLatestConverterData = createAsyncThunk(
    `latestConverter/fetchData`,
    async (params: Params, {rejectWithValue}) => {
        const {base, symbol} = params;
        const key = `${base}-${symbol}`;
        const local: LatestConverterData = JSON.parse(
            localStorage.getItem(key)
        );

        const curDateISO = getUnixTime(new Date());

        const isOldData = curDateISO - local.timestamp > 60 * 60 ;
        console.log(
            '🚀 ~ file: converterActions.ts ~ line 23 ~ isOldData',
            isOldData,
            curDateISO - local.timestamp
        );

        if (local && !isOldData) return local;
        try {
            const response = await getLatest<LatestConverterData>(base, symbol);
            const latestData = response.data;
            localStorage.setItem(key, JSON.stringify(latestData));
            return latestData;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
