import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {fetchLatestConverterData} from '../actionCreators';
import {LatestConverterData} from '../../types';

interface InitialState {
    data: LatestConverterData | null;
    isLoading: boolean;
    error: string;
}

const initialState: InitialState = {
    data: null,
    isLoading: null,
    error: '',
};

export const sliceName = 'latestConverter';

export const latestConverterSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLatestConverterData.fulfilled.type]: (
            state,
            action: PayloadAction<LatestConverterData>
        ) => {
            state.isLoading = false;
            state.error = '';
            state.data = action.payload;
        },
        [fetchLatestConverterData.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchLatestConverterData.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.isLoading = false;
            state.error = action.payload;
            state.data = null;
        },
    },
});
