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
  const { reset } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const cleanSubmit: SubmitHandler<FieldValues> = (data) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      data[key] = data[key].replace(/(\r\n|\n|\r){2,}/g, "\n\n").trim();
    });

    const empty = keys.filter((key) => data[key] === "");
    if (empty.length !== 0) {
      return false;
    }

    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(cleanSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}
