import {subMonths, subWeeks} from 'date-fns';

import {PeriodPickerValue} from '../types';

export const getLateDate = (
    activityValue: PeriodPickerValue,
    curDate: Date
) => {
    switch (activityValue) {
        case 'week':
            return subWeeks(curDate, 1);
        case 'halfMonth':
            return subWeeks(curDate, 2);
        case 'month':
            return subMonths(curDate, 1);
        case 'halfYear':
            return subMonths(curDate, 6);
        case 'year':
            return subMonths(curDate, 12);
    }
};
