export type PeriodPickerValue = 'day' | 'week' | 'month' | 'halfYear' | 'year';

export interface PeriodPickerMeta {
    label: string;
    value: PeriodPickerValue;
}

export interface SeriesPeriod {
    startDate: string;
    endDate: string;
}
