import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { TimePickerControllerProps } from '../fields';
import { TimePickerController } from '../components/InputController/TimePickerController/TimePickerController';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

const meta: Meta = {
    title: 'TimePicker Controller',
    component: TimePickerController,
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

// Define validation schema using Yup
const schema = object().shape({
    timePicker: string().test('isValidTime', 'Invalid time format', (value) => moment(value, 'HH:mm').isValid())
});

const Template: StoryFn<TimePickerControllerProps> = (args) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        console.log('Submitted data:', data);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TimePickerController {...args} control={control} />
                <button type="submit" style={{ marginTop: '16px' }}>
                    Submit
                </button>
            </form>
        </LocalizationProvider>
    );
};

// Default story
export const Default = Template.bind({});

Default.args = {
    name: 'timePicker',
    label: 'Select Time',
    format: 'HH:mm',
    parser: (value: any) => (moment(value).isValid() ? moment(value) : moment())
};

// Story with custom time format
export const CustomFormat = Template.bind({});

CustomFormat.args = {
    name: 'timePicker',
    label: 'Select Time (Custom Format)',
    format: 'hh:mm A', // 12-hour format with AM/PM
    parser: (value: any) => (moment(value, 'hh:mm A').isValid() ? moment(value, 'hh:mm A') : moment())
};

// Story with validation
export const WithValidation = Template.bind({});

WithValidation.args = {
    name: 'timePicker',
    label: 'Select Time (with validation)',
    format: 'HH:mm',
    parser: (value: any) => (moment(value).isValid() ? moment(value) : moment())
};
