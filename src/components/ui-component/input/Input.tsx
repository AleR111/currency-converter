import {FC} from 'react';
import {TextField} from '@mui/material';

interface InputProps {
    value?: string | number;
    setValue?: (value: string | number) => void;
    label?: string;
}

export const Input: FC<InputProps> = ({value, setValue, label}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            label={label}
            variant="outlined"
            value={value || ''}
            onChange={handleChange}
            size="small"
            fullWidth
            type="number"
        />
    );
};
