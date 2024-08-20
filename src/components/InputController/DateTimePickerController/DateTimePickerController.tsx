import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';
import { Controller } from 'react-hook-form';
import { DateTimePickerControllerProps } from '../../../fields';

export const DateTimePickerController: React.FC<DateTimePickerControllerProps> = ({
    name,
    control,
    parser = (value) => dayjs(value).toDate(),
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ref, ...restField }, fieldState: { invalid, error } }) => {
                const handleChange = (date: Date | null) => {
                    onChange(date); // Updates form state
                    if (rest?.onChange) {
                        rest.onChange(date); // Execute any custom logic
                    }
                };
                return (
                    <DateTimePicker
                        {...restField}
                        label={rest?.label}
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
