import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {fetchTimeSeriesRatesData} from '../actionCreators';
import {TimeSeriesConverterData} from '../../types';

interface InitialState {
    data: TimeSeriesConverterData | null;
    isLoading: boolean;
    error: string;
}

const initialState: InitialState = {
    data: null,
    isLoading: null,
    error: '',
};

export const sliceName = 'timeSeriesRates';

export const timeSeriesRatesSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setTimeSeriesCurrencyData(state, action: PayloadAction<TimeSeriesConverterData>) {
            state.data = action.payload;
        },
    },
    extraReducers: {
        [fetchTimeSeriesRatesData.fulfilled.type]: (
            state,
            action: PayloadAction<TimeSeriesConverterData>
        ) => {
            state.isLoading = false;
            state.error = '';
            state.data = action.payload;
        },
        [fetchTimeSeriesRatesData.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchTimeSeriesRatesData.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.isLoading = false;
            state.error = action.payload;
            state.data = null;
        },
    },
});
