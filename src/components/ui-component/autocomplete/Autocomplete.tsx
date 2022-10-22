import React, {FC, SyntheticEvent} from 'react';
import {Autocomplete as AutocompleteUI, TextField} from '@mui/material';

interface AutocompleteProps {
    value?: any;
    onChange?: (
        event: React.SyntheticEvent<Element, Event>,
        value: any
    ) => void;
    itemList: any[];
    label?: string;
    getOptionLabel?: ((option: any) => string) | undefined;
    onInputChange?:
        | ((event: SyntheticEvent<Element, Event>, value: any) => void)
        | undefined;
}

export const Autocomplete: FC<AutocompleteProps> = ({
    value,
    onChange,
    itemList,
    label,
    getOptionLabel,
    onInputChange,
}) => {
    return (
        <AutocompleteUI
            getOptionLabel={getOptionLabel}
            value={value}
            onChange={onChange}
            onInputChange={onInputChange}
            disablePortal
            blurOnSelect
            id="autocomplete"
            options={itemList}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                />
            )}
            size="small"
            fullWidth
        />
    );
};
