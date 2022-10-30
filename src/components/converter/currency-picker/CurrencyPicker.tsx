import {FC} from 'react';

import {Autocomplete, Divider} from '../../ui-component';
import {currencyList} from '../../../settings';

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
        <>
            <Autocomplete
                itemList={itemList}
                getOptionLabel={(option: string) => currencyList[option]}
                label={base}
                value={base}
                onChange={(_, newValue: string) => {
                    setBase(newValue);
                }}
            />
            <Divider />
            <Autocomplete
                itemList={itemList}
                getOptionLabel={(option: string) => currencyList[option]}
                label={symbol}
                value={symbol}
                onChange={(_, newValue: string) => {
                    setSymbol(newValue);
                }}
            />
        </>
    );
};
