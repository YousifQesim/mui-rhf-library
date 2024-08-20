import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { DateTimePickerControllerProps } from '../fields';
import { DateTimePickerController } from '../components/InputController/DateTimePickerController/DateTimePickerController';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { date, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

const meta: Meta = {
    title: 'DateTimePicker Controller',
    component: DateTimePickerController,
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

const schema = object().shape({
    dateTimePicker: date()
        .nullable()
        .transform((v) => (v instanceof Date && !isNaN(v as any) ? v : null))
});

const Template: StoryFn<DateTimePickerControllerProps> = (args) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <DateTimePickerController {...args} control={control} />
                <button type="submit">Submit</button>
            </form>
        </LocalizationProvider>
    );
};

export const DateTimePicker = Template.bind({});

DateTimePicker.args = {
    name: 'dateTimePicker',
    label: 'Date & Time Picker Controller',
    format: 'YYYY-MM-DD HH:mm:ss',
    parser: (value: any) => (moment(value).isValid() ? moment(value) : moment())
};
