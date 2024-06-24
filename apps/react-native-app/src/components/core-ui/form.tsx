import React from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Colors, ds } from '~react-native-design-system';

import Text from './text';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>((props, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <View ref={ref} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<React.ElementRef<typeof Text>, React.ComponentPropsWithoutRef<typeof Text>>(
  (props, ref) => {
    const { error, formItemId } = useFormField();

    return <Text key={formItemId} ref={ref} style={[ds.mb6, error && ds.textRed500]} {...props} />;
  }
);

FormLabel.displayName = 'FormLabel';

interface IFormMessageProps extends React.ComponentPropsWithoutRef<typeof Text> {
  message?: string;
}

const FormMessage = React.forwardRef<React.ElementRef<typeof Text>, IFormMessageProps>(
  ({ children, message, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? (message ? message : String(error?.message)) : children;

    if (!body) {
      return null;
    }

    return (
      <Text
        ref={ref}
        key={formMessageId}
        fontSize={15}
        fontWeight="Medium"
        color={Colors.red[500]}
        style={ds.mt2}
        {...props}
      >
        {body}
      </Text>
    );
  }
);

FormMessage.displayName = 'FormMessage';

export { Form, FormField, FormItem, FormLabel, FormMessage, useFormField };
