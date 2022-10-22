import {latestConverterSlice} from './converterReducer';

export const reducers = {
    latestConverter: latestConverterSlice.reducer,
};

export const actions = {...latestConverterSlice.actions};
