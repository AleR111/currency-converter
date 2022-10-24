import {useEffect, useState} from 'react';
import {getLatest, getTimeSeries} from '../../api';
import {useAppActions} from '../../hooks';
import {CurrencyList, SeriesPeriod} from '../../types';
import {Chart} from './chart';
import {CurrencyPicker} from './currency-picker';
import {LatestCurrency} from './latest-currency';
import {PeriodPicker} from './period-picker';

const ConverterContainer = () => {};

export const Converter = () => {
    const [base, setBase] = useState<CurrencyList>(
        //     {
        //     code: 'USD',
        //     label: 'Доллар США',
        // }
        null
    );
    const [symbol, setSymbol] = useState<CurrencyList>(null);
    //     {
    //     code: 'EUR',
    //     label: 'Евро',
    // }
    const [period, setPeriod] = useState<SeriesPeriod | null>(null);
    console.log(
        '🚀 ~ file: Converter.tsx ~ line 22 ~ Converter ~ period',
        period
    );

    const baseCode = base?.code || 'USD';
    const symbolCode = symbol?.code || 'EUR';

    const {fetchLatestConverterData, fetchTimeSeriesRatesData} =
        useAppActions();
    useEffect(() => {
        if (!period) return;
        const {startDate, endDate} = period;
        const id = setInterval(
            () =>
                fetchLatestConverterData({
                    base: baseCode,
                    symbol: symbolCode,
                }),
            60000
        );
        fetchLatestConverterData({
            base: baseCode,
            symbol: symbolCode,
        }),
            fetchTimeSeriesRatesData({
                startDate,
                endDate,
                base: baseCode,
                symbol: symbolCode,
            });
        console.log(
            '🚀 ~ file: Converter.tsx ~ line 24 ~ useEffect ~ symbol',
            'symbol'
        );

        return () => {
            clearTimeout(id);
        };
    }, [period, base, symbol]);
    return (
        <div>
            <CurrencyPicker
                base={base}
                setBase={setBase}
                symbol={symbol}
                setSymbol={setSymbol}
            />
            <PeriodPicker setPeriod={setPeriod} />
            <LatestCurrency />
            <Chart />
        </div>
    );
};
