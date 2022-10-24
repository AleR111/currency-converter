import {useCallback, useEffect, useState} from 'react';
import {useAppActions} from '../../hooks';
import {persistentStorage} from '../../hooks/local-storage/localStorage';
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
    const [base, setBase] = useState<string>('USD');
    const [symbol, setSymbol] = useState<string>('RUB');

    const [period, setPeriod] = useState<SeriesPeriod | null>(null);

    const {
        fetchLatestConverterData,
        setLatestCurrencyData,
        fetchTimeSeriesRatesData,
        setTimeSeriesCurrencyData,
    } = useAppActions();

    const key = `${base}-${symbol}`;
    const seriesKey = `${key}-series`;

    const latestCurrency = persistentStorage.getItem(key);
    const timeSeriesCurrency = persistentStorage.getItem(seriesKey);

    const latestHandler = useCallback(() => {
        const isOldData = curDateISO - latestCurrency?.timestamp > updatingTime;

        if (latestCurrency && !isOldData) {
            return setLatestCurrencyData(latestCurrency);
        }

        fetchLatestConverterData({
            base,
            symbol,
            key,
        });
    }, [latestCurrency, base, symbol]);

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
            base,
            symbol,
            key: seriesKey,
        });
    }, [period, base, symbol, timeSeriesCurrency]);

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
