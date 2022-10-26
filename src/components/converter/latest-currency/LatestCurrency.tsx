import {format, fromUnixTime} from 'date-fns';

import {useAppSelector} from '../../../hooks';
import {Error, Skeleton} from '../../ui-component';
import classes from './latestCurrency.module.scss';

export const LatestCurrency = () => {
    const {data, isLoading, error} = useAppSelector(
        (state) => state.latestConverter
    );

    if (!data) return null;
    const key = Object.keys(data.rates)[0];
    const value = data.rates[key].toFixed(3);

    const time = format(fromUnixTime(data.timestamp), 'yyyy-MMM-dd hh:mmaaa');

    if (isLoading)
        return (
            <Skeleton
                height={60}
                width={136}
            />
        );

    if (error) return <Error value={error} />;

    return (
        <div>
            <div className={classes.value}>{value}</div>
            <div className={classes.time}>{time}</div>
        </div>
    );
};
