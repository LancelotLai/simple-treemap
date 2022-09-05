import React, { FC, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '../../../components/Form/Input';
import { InputProps } from '../../../components/Form/Input/interface';

const InputTest: FC = ({ ...props }) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = (data: any): void => {
    console.log(data, 143);
  };

  const inputDataArray: Array<InputProps> = [
    {
      name: 'data',
      labelText: 'Data:',
      type: 'textarea',
      errorMessage: 'test error',
      rules: {
        validate: (value: any) => {
          try {
            switch (false) {
              case value.match('/{.*:{.*:.*}}/g'):
                console.log(123);
                return false;
              case Array.isArray(JSON?.parse(value)) &&
                JSON.parse(value)?.length <= 50:
                console.log(456);
                return false;
              case JSON?.parse(value)?.filter(
                (v: any) => typeof v?.name !== 'string'
              )?.length === 0:
                console.log(789);
                return false;
              case JSON?.parse(value)?.filter(
                (v: any) =>
                  typeof v?.weight !== 'number' || Number.isNaN(v?.weight)
              )?.length === 0:
                console.log(1111);
                return false;
              default:
                return true;
            }
          } catch (e) {
            return false;
          }
        },
      },
    },
    {
      name: 'rowNumber',
      labelText: 'Row Number:',
      type: 'number',
      errorMessage: 'test error',
      rules: {
        validate: {
          isNumber: (value: any) => +value,
        },
      },
    },
  ];
  return (
    <FormProvider {...methods} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputDataArray?.map((v: InputProps, i: number) => (
          <Input
            name={v?.name}
            type={v?.type}
            labelText={v?.labelText}
            rules={v?.rules}
            errorMessage={v?.errorMessage}
            key={`Input: ${i}`}
          />
        ))}
        <input type="submit" />
        <input type="reset" />
      </form>
    </FormProvider>
  );
};

export default {
  title: 'Components/Input',
  component: InputTest,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof InputTest>;

const InputStory: ComponentStory<typeof InputTest> = () => {
  return <InputTest />;
};
export const input = InputStory.bind({});
