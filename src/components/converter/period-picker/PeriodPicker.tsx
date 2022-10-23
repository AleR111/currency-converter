import {useState} from 'react';
import {ToggleButton} from '../../ui-component/toggle-button';

export const PeriodPicker = () => {
    const [value, setValue] = useState('');
    console.log("🚀 ~ file: PeriodPicker.tsx ~ line 6 ~ PeriodPicker ~ value", value)

    const activityValue = [
        {label: 'День', value: 'day'},
        {label: 'Месяц', value: 'month'},
        {label: 'Пол года', value: 'halfyear'},
        {label: 'Год', value: 'year'},
    ];
    const onChangeHandler = (newValue: string) => {
        setValue(newValue);
    };
    return (
        <div>
            <ToggleButton
                buttonList={activityValue}
                value={value}
                onChange={onChangeHandler}
            />
        </div>
    );
};
