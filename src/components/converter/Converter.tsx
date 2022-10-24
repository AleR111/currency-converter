import {useCallback, useEffect, useState} from 'react';
import {useAppActions} from '../../hooks';
import {useLocalStorage} from '../../hooks/local-storage/useLocalStorage';
import {curDateISO, updatingTime} from '../../settings';
import {
    CurrencyList,
    LatestConverterData,
    SeriesPeriod,
    TimeSeriesConverterData,
    TimeSeriesRates,
} from '../../types';
import {Chart} from './chart';
import {CurrencyPicker} from './currency-picker';
import {LatestCurrency} from './latest-currency';
import {PeriodPicker} from './period-picker';

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

    const {
        fetchLatestConverterData,
        setLatestCurrencyData,
        fetchTimeSeriesRatesData,
        setTimeSeriesCurrencyData,
    } = useAppActions();

    const baseCode = base?.code || 'USD';
    const symbolCode = symbol?.code || 'EUR';
    const key = `${baseCode}-${symbolCode}`;
    const seriesKey = `${key}-series`;

    const [latestCurrency, setLatestCurrency] =
        useLocalStorage<LatestConverterData | null>(key, null);
    const [timeSeriesCurrency, setTimeSeriesCurrency] =
        useLocalStorage<TimeSeriesConverterData | null>(seriesKey, null);

    const latestHandler = useCallback(() => {
        const isOldData = curDateISO - latestCurrency?.timestamp > updatingTime;

        if (latestCurrency && !isOldData) {
            return setLatestCurrencyData(latestCurrency);
        }

        fetchLatestConverterData({
            base: baseCode,
            symbol: symbolCode,
            setLatestCurrency,
        });
    }, [latestCurrency, baseCode, symbolCode]);

    const timeSeriesHandler = useCallback(() => {
        if (!period) return;
        const {startDate, endDate} = period;

        const isIncludeStartDate = startDate >= timeSeriesCurrency?.start_date;
        const isIncludeEndDate = endDate <= timeSeriesCurrency?.end_date;

        if (timeSeriesCurrency && isIncludeStartDate && isIncludeEndDate) {
            const curDataArray = {} as TimeSeriesRates;
            for (const date in timeSeriesCurrency.rates) {
                if (startDate <= date && date <= endDate) {
                    curDataArray[date] = timeSeriesCurrency.rates[date];
                }
            }
            return setTimeSeriesCurrencyData({
                ...timeSeriesCurrency,
                rates: curDataArray,
            });
        }

        fetchTimeSeriesRatesData({
            startDate,
            endDate,
            base: baseCode,
            symbol: symbolCode,
            setTimeSeriesCurrency,
        });
    }, [period, timeSeriesCurrency]);

    useEffect(() => {
        latestHandler();
        timeSeriesHandler();
    }, [latestHandler, timeSeriesHandler]);

    console.log('converter 211');

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
