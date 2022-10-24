import {FC, memo, useEffect, useState} from 'react';
import {subDays, subMonths, format, subWeeks} from 'date-fns';

import {
    PeriodPickerMeta,
    PeriodPickerValue,
    SeriesPeriod,
} from '../../../types';
import {ToggleButton} from '../../ui-component/toggle-button';

const activityValue: PeriodPickerMeta[] = [
    {label: '1 Day', value: 'day'},
    {label: '1 Week', value: 'week'},
    {label: '1 Month', value: 'month'},
    {label: '6 Month', value: 'halfYear'},
    {label: '1 Year', value: 'year'},
];

const getLateDate = (activityValue: PeriodPickerValue, curDate: Date) => {
    switch (activityValue) {
        case 'day':
            return subDays(curDate, 1);
        case 'week':
            return subWeeks(curDate, 1);
        case 'month':
            return subMonths(curDate, 1);
        case 'halfYear':
            return subMonths(curDate, 6);
        case 'year':
            return subMonths(curDate, 12);
    }
};

const getDatePeriod = (activityValue: PeriodPickerValue) => {
    const nowDate = new Date();
    const startDate = getLateDate(activityValue, nowDate);

    return {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(nowDate, 'yyyy-MM-dd'),
    };
};

interface PeriodPickerProps {
    setPeriod: (period: SeriesPeriod) => void;
}

export const PeriodPicker: FC<PeriodPickerProps> = memo(({setPeriod}) => {
    const [value, setValue] = useState<PeriodPickerValue>('week');

    const onChangeHandler = (newValue: PeriodPickerValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setPeriod(getDatePeriod(value));
    }, [value]);
    return (
        <div>
            <ToggleButton
                buttonList={activityValue}
                value={value}
                onChange={onChangeHandler}
            />
        </div>
    );
});
