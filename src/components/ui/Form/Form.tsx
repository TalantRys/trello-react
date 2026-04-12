import {
  useEffect,
  type FormHTMLAttributes,
  type PropsWithChildren,
} from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";

type FormProps = UseFormProps &
  Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
    onSubmit: SubmitHandler<FieldValues>;
  };

export default function Form({
  defaultValues,
  children,
  onSubmit,
  ...props
}: PropsWithChildren<FormProps>) {
  const methods = useForm({ defaultValues, mode: props.mode });
  const reset = methods.reset;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}
