import React, {FC} from 'react';
import {ToggleButtonGroup, ToggleButton as ToggleButtonUI} from '@mui/material';

const styledToggleButton = {
    '& .MuiToggleButtonGroup-grouped': {
        margin: 0.5,
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: 1,
        },
        '&:first-of-type': {
            borderRadius: 1,
        },
    },
};

interface ListItem {
    value: string;
    label: string | JSX.Element;
}
interface ToggleButtonProps {
    buttonList: ListItem[];
    value: string | null;
    onChange: (value: string) => void;
    className?: string;
    isActive?: boolean;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
    buttonList,
    value,
    onChange,
    className,
    isActive = false,
}) => {
    const handleChange = (e: React.MouseEvent, newValue: string) => {
        if (!isActive || newValue !== null) {
            onChange(newValue);
        }
    };
    return (
        <div>
            <ToggleButtonGroup
                size="small"
                value={value}
                exclusive
                onChange={handleChange}
                sx={styledToggleButton}
            >
                {buttonList.map((el, index) => {
                    return (
                        <ToggleButtonUI
                            key={index}
                            value={el.value}
                            className={className}
                        >
                            {el.label}
                        </ToggleButtonUI>
                    );
                })}
            </ToggleButtonGroup>
        </div>
    );
};
