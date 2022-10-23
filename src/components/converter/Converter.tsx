import {useEffect} from 'react';
import {getLatest, getTimeSeries} from '../../api';
import {useAppActions} from '../../hooks';
import {Chart} from './chart';
import {CurrencyPicker} from './currency-picker';
import {LatestCurrency} from './latest-currency';
import {PeriodPicker} from './period-picker';

export const Converter = () => {
    const {fetchLatestConverterData, fetchTimeSeriesRatesData} =
        useAppActions();
    useEffect(() => {
        const id = setInterval(
            () => fetchLatestConverterData({base: 'USD', symbol: 'EUR'}),
            60000
        );
        fetchLatestConverterData({base: 'USD', symbol: 'EUR'});
        fetchTimeSeriesRatesData({
            startDate: '2022-09-21',
            endDate: '2022-10-23',
            base: 'USD',
            symbol: 'EUR',
        });
            console.log("🚀 ~ file: Converter.tsx ~ line 24 ~ useEffect ~ symbol", 'symbol')
        
        return () => {
            clearTimeout(id);
        };
    }, []);
    return (
        <div>
            <CurrencyPicker />
            <PeriodPicker />
            <LatestCurrency />
            <Chart />
        </div>
    );
};
