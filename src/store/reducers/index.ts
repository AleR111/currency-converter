import {latestConverterSlice} from './converterReducer';
import {timeSeriesRatesSlice} from './timeSeriesRatesReducer';

export const reducers = {
    latestConverter: latestConverterSlice.reducer,
    timeSeriesRates: timeSeriesRatesSlice.reducer,
};

export const actions = {
    ...latestConverterSlice.actions,
    ...timeSeriesRatesSlice.actions,
};
