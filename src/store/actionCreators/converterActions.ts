import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUnixTime} from 'date-fns';

import {getLatest} from '../../api';
import {persistentStorage} from '../../hooks/local-storage/localStorage';
import {LatestConverterData} from '../../types';

interface Params {
    base: string;
    symbol: string;
    key: string;
}

export const fetchLatestConverterData = createAsyncThunk(
    `latestConverter/fetchData`,
    async (params: Params, {rejectWithValue}) => {
        const {base, symbol, key} = params;

        try {
            const response = await getLatest<LatestConverterData>(base, symbol);
            const latestData = response.data;
            persistentStorage.setItem(key, latestData);
            return latestData;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
