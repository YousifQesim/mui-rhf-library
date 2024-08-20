import { GridProps, TextFieldProps } from '@mui/material';
import React from 'react';
import { Control } from 'react-hook-form';
import {
    AutocompleteControllerProps,
    CheckboxControllerProps,
    RadioGroupControllerProps,
    SelectControllerProps,
    SwitchControllerProps,
    TextFieldControllerProps,
    DatePickerControllerProps,
    CustomComponentControllerProps,
    DateTimePickerControllerProps,
    TimePickerControllerProps,
    
} from '../fields';
import { DatePickerProps, TimePickerProps } from '@mui/x-date-pickers';

// New type for DateTimePickerFieldProps
type DateTimePickerFieldProps<T> = DatePickerProps<any> & {
    fieldType: 'dateTimePicker';
    parser: (value: string) => T;
    hidden?: boolean;
};

// Updated DatePickerFieldProps to maintain existing functionality
type DatePickerFieldProps<T> = DatePickerProps<any> & {
    fieldType: 'datePicker';
    parser: (value: string) => T;
    hidden?: boolean;
};
type  TimePickerFieldProps = TimePickerProps<any>  & {
    fieldType: 'timePicker';
    parser: (value: string) => string;
    hidden?: boolean;
};

// Updated FieldProps to include DateTimePickerFieldProps
export type FieldProps<T = any> =
|     
(DatePickerFieldProps<T> & {  
    name: string;
    label?: string;
    props?: any;
    gridProps?: Pick<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
    textFieldProps?: TextFieldProps;
    CustomComponent?: React.FC<any>;
})
    | (DatePickerFieldProps<T> & {
          name: string;
          label?: string;
          props?: any;
          gridProps?: Pick<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
          textFieldProps?: TextFieldProps;
          CustomComponent?: React.FC<any>;
      })
    | (DateTimePickerFieldProps<T> & {
          name: string;
          label?: string;
          props?: any;
          gridProps?: Pick<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
          textFieldProps?: TextFieldProps;
          CustomComponent?: React.FC<any>;
      })
    | {
          hidden?: boolean;
          fieldType: 'textField' | 'select' | 'autocomplete' | 'checkbox' | 'radioGroup' | 'switch' | 'custom';
          name: string;
          label?: string;
          props?: any;
          gridProps?: Pick<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
          textFieldProps?: TextFieldProps;
          CustomComponent?: React.FC<any>;
      }

      ;

export interface FormFieldsProps {
    fields: FieldProps[];
    control: Control<any>;
}


export type MuiRhfFieldComponentMap = {
    textField: React.FC<TextFieldControllerProps>;
    select: React.FC<SelectControllerProps>;
    checkbox: React.FC<CheckboxControllerProps>;
    autocomplete: React.FC<AutocompleteControllerProps>;
    radioGroup: React.FC<RadioGroupControllerProps>;
    switch: React.FC<SwitchControllerProps>;
    datePicker: React.FC<DatePickerControllerProps>;
    custom: React.FC<CustomComponentControllerProps>;
    dateTimePicker: React.FC<DateTimePickerControllerProps>;
    timePicker: React.FC<TimePickerControllerProps>;
};
