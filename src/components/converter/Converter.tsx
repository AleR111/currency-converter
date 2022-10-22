import {useEffect} from 'react';
import {getLatest, getTimeSeries} from '../../api';
import {useAppActions} from '../../hooks';
import {CurrencyPicker} from './currency-picker';

export const Converter = () => {
    const {fetchLatestConverterData, fetchTimeSeriesRatesData} =
        useAppActions();
    // useEffect(() => {
    //     const id = setInterval(
    //         () => fetchLatestConverterData({base: 'USD', symbol: 'EUR'}),
    //         60000
    //     );
    //     fetchLatestConverterData({base: 'USD', symbol: 'EUR'});
    //     fetchTimeSeriesRatesData({
    //         startDate: '2022-09-11',
    //         endDate: '2022-09-22',
    //         base: 'USD',
    //         symbol: 'EUR',
    //     });
    //     return () => {
    //         clearTimeout(id);
    //     };
    // }, []);
    return (
        <div>
            <CurrencyPicker />
        </div>
    );
};
