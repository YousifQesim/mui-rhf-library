import React from 'react';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { TimePickerControllerProps } from '../../../fields';

export const TimePickerController: React.FC<TimePickerControllerProps> = ({
    name,
    control,
    parser = (value) => dayjs(value).format('HH:mm'),
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TimePicker
                    {...rest}
                    value={parser(field.value)}
                    onChange={(value) => {
                        const formattedValue = value ? dayjs(value).format('HH:mm') : '';
                        field.onChange(formattedValue);
                    }}
                    slotProps={{
                        textField: {
                            error: fieldState.invalid,
                            helperText: fieldState.error?.message,
                            fullWidth: true
                        }
                    }}
                />
            )}
        />
    );
};
