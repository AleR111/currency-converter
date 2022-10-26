export type PeriodPickerValue =
    | 'week'
    | 'halfMonth'
    | 'month'
    | 'halfYear'
    | 'year';

export interface PeriodPickerMeta {
    label: string;
    value: PeriodPickerValue;
}

export interface SeriesPeriod {
    startDate: string;
    endDate: string;
}
