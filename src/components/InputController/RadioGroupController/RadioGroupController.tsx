import React from 'react';
import { Controller } from 'react-hook-form';

// material ui
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { RadioGroupControllerProps } from '../../../fields';

export const RadioGroupController: React.FC<RadioGroupControllerProps> = ({
    name,
    label,
    defaultValue,
    control,
    options,
    optionLabel = 'label', 
    optionValue = 'value',  
    onChange,
    onBlur,
    ...rest
}) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue || ''}
            render={({ field, fieldState }) => (
                <FormControl error={fieldState?.invalid} component="fieldset" {...rest}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <RadioGroup
                        style={{ flexDirection: 'row' }}
                        {...field}
                        onChange={(event) => {
                            onChange?.(event);
                            field.onChange(event);
                        }}
                        onBlur={(...args) => {
                            field?.onBlur?.();
                            onBlur?.(...args);
                        }}
                    >
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={String(option[optionValue])} 
                                control={<Radio />}
                                label={String(option[optionLabel])} 
                            />
                        ))}
                    </RadioGroup>
                    <FormHelperText>{fieldState?.error?.message ?? rest.helperText}</FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default RadioGroupController;
