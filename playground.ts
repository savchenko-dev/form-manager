import {
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  GlobalError,
  IsAny,
  ResolverOptions,
  useForm,
} from "react-hook-form";

const useSomeForm = () => {
  const { ...methods } = useForm();
};

export type FieldErrors<T extends FieldValues = FieldValues> = Partial<
  FieldValues extends IsAny<FieldValues>
    ? any
    : FieldErrorsImpl<DeepRequired<T>>
> & {
  root?: Record<string, GlobalError> & GlobalError;
};

export type ResolverSuccess<TFieldValues extends FieldValues = FieldValues> = {
  values: TFieldValues;
  errors: {};
};
export type ResolverError<TFieldValues extends FieldValues = FieldValues> = {
  values: {};
  errors: FieldErrors<TFieldValues>;
};

type r = FieldErrorsImpl<{
  email: string;
  password: string;
  parent: { child: 1 };
}>;

export type ResolverResult<TFieldValues extends FieldValues = FieldValues> =
  | ResolverSuccess<TFieldValues>
  | ResolverError<TFieldValues>;

export type Resolver<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = (
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>
) => Promise<ResolverResult<TFieldValues>> | ResolverResult<TFieldValues>;

const yupResolver: Resolver = (values, context, options) => {
  return {
    values: {},
    errors: {},
  };
};

const res = yupResolver(
  { email: "", password: "" },
  {},
  { fields: {}, shouldUseNativeValidation: true }
);
