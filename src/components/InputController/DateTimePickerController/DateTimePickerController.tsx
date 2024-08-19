import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';
import { Controller } from 'react-hook-form';
import { DateTimePickerControllerProps } from '../../../fields';

export const DateTimePickerController: React.FC<DateTimePickerControllerProps> = ({
    name,
    control,
    parser = (value) => value,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <DateTimePicker
                        {...field}
                        label={rest?.label}
                        slotProps={{
                            textField: {
                                error: fieldState?.invalid,
                                helperText: fieldState?.error?.message,
                                fullWidth: true
                            }
                        }}
                        {...rest}
                        value={parser(field.value)}
                        onChange={(value) => {
                            field.onChange(dayjs(value, 'HH:mm:ss').format('HH:mm:ss'));
                        }}
                    />
                );
            }}
        />
    );
};
