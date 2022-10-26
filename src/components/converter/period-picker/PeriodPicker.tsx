import {FC, memo, useEffect, useState} from 'react';
import {format} from 'date-fns';

import {
    PeriodPickerMeta,
    PeriodPickerValue,
    SeriesPeriod,
} from '../../../types';
import {ToggleButton} from '../../ui-component/toggle-button';
import {getLateDate} from '../../../utils';

const activityValue: PeriodPickerMeta[] = [
    {label: '1 Week', value: 'week'},
    {label: '2 Week', value: 'halfMonth'},
    {label: '1 Month', value: 'month'},
    {label: '6 Month', value: 'halfYear'},
    {label: '1 Year', value: 'year'},
];

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
