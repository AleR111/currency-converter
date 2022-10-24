import {Autocomplete} from '../../ui-component';
import classes from './currencyPicker.module.scss';
import {currencyList} from '../../../settings';
import {FC} from 'react';

interface CurrencyPickerParams {
    base: string;
    setBase: (value: string | null) => void;
    symbol: string | null;
    setSymbol: (value: string | null) => void;
}

export const CurrencyPicker: FC<CurrencyPickerParams> = ({
    base,
    setBase,
    symbol,
    setSymbol,
}) => {
    const itemList = Object.keys(currencyList);
    return (
        <div>
            <div className={classes.locationsPickerBox}>
                <Autocomplete
                    itemList={itemList}
                    getOptionLabel={(option: string) => currencyList[option]}
                    label={base}
                    value={base}
                    onChange={(_, newValue: string) => {
                        setBase(newValue);
                    }}
                />
                <div className={classes.dash}> / </div>
                <Autocomplete
                    itemList={itemList}
                    getOptionLabel={(option: string) => currencyList[option]}
                    label={symbol}
                    value={symbol}
                    onChange={(_, newValue: string) => {
                        setSymbol(newValue);
                    }}
                />
            </div>
        </div>
    );
};
