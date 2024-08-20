import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { DatePickerControllerProps } from '../../../fields';

export const DatePickerController: React.FC<DatePickerControllerProps> = ({
    name,
    control,
    parser,
    onChange,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={rest?.defaultValue || ''}
            render={({ field: { onChange, value, ref, ...restField }, fieldState: { invalid, error } }) => {
                const handleChange = (date: Date | null) => {
                    onChange(date); // Updates form state
                    if (onChange) {
                        onChange(date); // Execute any custom logic
                    }
                };

                return (
                    <DatePicker
                        {...restField}
                        label={rest?.label}
                        inputRef={ref}
                        slotProps={{
                            textField: {
                                error: invalid,
                                helperText: error?.message || rest.helperText,
                                fullWidth: true
                            }
                        }}
                        {...rest}
                        value={value ? parser(value) : null}
                        onChange={handleChange}
                    />
                );
            }}
        />
    );
};

export default DatePickerController;
