import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {getUnixTime} from 'date-fns';

import {useAppActions} from '../../hooks';
import {persistentStorage} from '../../hooks';
import {updateTime, updatingTime} from '../../settings';
import {
    LatestConverterData,
    SeriesPeriod,
    TimeSeriesConverterData,
    TimeSeriesRates,
} from '../../types';
import {Chart} from './chart';
import {CurrencyPicker} from './currency-picker';
import {LatestCurrency} from './latest-currency';
import {PeriodPicker} from './period-picker';
import classes from './converter.module.scss';
import {CalculateLayout} from './calculate-layout';
import {CurrencyAmount} from './currency-amount';

export const Converter: FC = () => {
    const curDateISO = getUnixTime(new Date());

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

    const getLocalStorageData = useCallback(() => {
        const latestCurrency =
            persistentStorage.getItem<LatestConverterData>(key);
        const timeSeriesCurrency =
            persistentStorage.getItem<TimeSeriesConverterData>(seriesKey);

        return {latestCurrency, timeSeriesCurrency};
    }, [key, seriesKey]);

    const latestHandler = useCallback(() => {
        const {latestCurrency} = getLocalStorageData();
        const isOldData = latestCurrency
            ? curDateISO - latestCurrency?.timestamp > updatingTime
            : true;

        if (!isOldData) {
            return setLatestCurrencyData(latestCurrency);
        }

        fetchLatestConverterData({
            base,
            symbol,
            key,
        });
    }, [getLocalStorageData, base, symbol]);

    const timeSeriesHandler = useCallback(() => {
        if (!period) return;
        const {timeSeriesCurrency} = getLocalStorageData();

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
    }, [period, base, symbol, getLocalStorageData]);

    useEffect(() => {
        timeSeriesHandler();
    }, [timeSeriesHandler]);

    useEffect(() => {
        latestHandler();

        const id = setInterval(() => {
            latestHandler();
        }, updateTime);

        return () => {
            clearInterval(id);
        };
    }, [latestHandler]);

    return (
        <div className={classes.wrapper}>
            <CalculateLayout
                pickComponent={
                    <CurrencyPicker
                        base={base}
                        setBase={setBase}
                        symbol={symbol}
                        setSymbol={setSymbol}
                    />
                }
                amountComponent={<CurrencyAmount />}
            />

            <LatestCurrency />
            <PeriodPicker setPeriod={setPeriod} />
            <Chart />
        </div>
    );
};
