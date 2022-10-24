import {Autocomplete} from '../../ui-component';
import classes from './currencyPicker.module.scss';
import {currencyList} from '../../../settings';
import {Dispatch, FC, useState} from 'react';
import {CurrencyList} from '../../../types';

interface CurrencyPickerParams {
    base: CurrencyList | null;
    setBase: (value: CurrencyList | null) => void;
    symbol: CurrencyList | null;
    setSymbol: (value: CurrencyList | null) => void;
}

export const CurrencyPicker: FC<CurrencyPickerParams> = ({
    base,
    setBase,
    symbol,
    setSymbol,
}) => {
    return (
        <div>
            <div className={classes.locationsPickerBox}>
                <Autocomplete
                    itemList={currencyList}
                    getOptionLabel={(option: CurrencyList) => option?.label}
                    label={base?.code}
                    value={base}
                    onChange={(_, newValue: CurrencyList) => {
                        setBase(newValue);
                    }}
                />
                <div className={classes.dash}> / </div>
                <Autocomplete
                    itemList={currencyList}
                    getOptionLabel={(option: CurrencyList) => option?.label}
                    label={symbol?.code}
                    value={symbol}
                    onChange={(_, newValue) => {
                        setSymbol(newValue);
                    }}
                />
            </div>
            <div>
                {base?.code}/{symbol?.code}
            </div>
        </div>
    );
};
