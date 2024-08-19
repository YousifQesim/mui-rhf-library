import React from 'react';
import { TextFieldController } from '../InputController/TextFieldController/TextFieldController';
import { SelectController } from '../InputController/SelectController/SelectController';
import { AutocompleteController } from '../InputController/AutocompleteController/AutocompleteController';
import { CheckboxController } from '../InputController/CheckboxController/CheckboxController';
import { RadioGroupController } from '../InputController/RadioGroupController/RadioGroupController';
import { SwitchController } from '../InputController/SwitchController/SwitchController';
import { CustomComponentController } from '../InputController/CustomComponentController/CustomComponentController';
import DatePickerController from '../InputController/DatePickerController/DatePickerController';

import { Grid } from '@mui/material';

import { FormFieldsProps, MuiRhfFieldComponentMap } from '../../form/typing';
import { DateTimePickerController } from '../InputController/DateTimePickerController/DateTimePickerController';

const MuiFieldComponentMapper: MuiRhfFieldComponentMap = {
    textField: TextFieldController,
    select: SelectController,
    autocomplete: AutocompleteController,
    checkbox: CheckboxController,
    radioGroup: RadioGroupController,
    switch: SwitchController,
    datePicker: DatePickerController,
    custom: CustomComponentController,
    dateTimePicker: DateTimePickerController
};

export const FormFields: React.FC<FormFieldsProps> = ({ fields, control }) => {
    return (
        <>
            {fields
                ?.filter(({ hidden }) => !hidden)
                .map(({ fieldType, props, name, label, gridProps, ...rest }, index) => {
                    const MuiRhfField =
                        MuiFieldComponentMapper[fieldType as keyof MuiRhfFieldComponentMap] || TextFieldController;

                    return (
                        <Grid item xs={12} {...gridProps} key={name + index}>
                            <MuiRhfField {...props} {...rest} name={name} label={label} control={control} />
                        </Grid>
                    );
                })}
        </>
    );
};
