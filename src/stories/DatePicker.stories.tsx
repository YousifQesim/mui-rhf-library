import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { DatePickerControllerProps } from '../fields';
import DatePickerController from '../components/InputController/DatePickerController/DatePickerController';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { date, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

const meta: Meta = {
    title: 'DatePicker Controller',
    component: DatePickerController,
    argTypes: {
        children: {
            control: {
                type: 'text'
            }
        }
    },
    parameters: {
        controls: { expanded: true }
    }
};

export default meta;

// Schema for validation using yup
const schema = object().shape({
    datePicker: date()
        .nullable()
        .transform((v) => (v instanceof Date && !isNaN(v as any) ? v : null))
        .required('Date is required')
});

const Template: StoryFn<DatePickerControllerProps> = (args) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log('Submitted data:', data);
                })}
            >
                <DatePickerController {...args} control={control} />
                <button type="submit">Submit</button>
            </form>
        </LocalizationProvider>
    );
};

export const DatePicker = Template.bind({});

DatePicker.args = {
    name: 'datePicker',
    label: 'Date Picker Controller',
    format: 'YYYY-MM-DD',
    parser: (value: any) => (moment(value).isValid() ? moment(value) : moment())
};
