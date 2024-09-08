import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { RadioGroupController } from '../components/InputController/RadioGroupController/RadioGroupController';
import { useForm } from 'react-hook-form';
import { RadioGroupControllerProps } from '../fields';

const meta: Meta = {
    title: 'RadioGroup Controller',
    component: RadioGroupController,
    argTypes: {
        optionLabel: { control: 'text' }, 
        optionValue: { control: 'text' }, 
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

const Template: StoryFn<RadioGroupControllerProps> = (args) => {
    const { control } = useForm();

    return <RadioGroupController {...args} control={control} />;
};

export const FormGroup = Template.bind({});

FormGroup.args = {
    name: 'formGroup',
    defaultValue: '',
    label: 'RadioGroup Controller',

    options: [
        { label: 'Option A', value: 'A', description: 'This is option A' },
        { label: 'Option B', value: 'B', description: 'This is option B' },
        { label: 'Option C', value: 'C', description: 'This is option C' },
    ],
  
    optionLabel: 'description', 
    optionValue: 'value',        
};

