import { FieldValues } from "react-hook-form";

export type Message = string;

export type FieldError = {
  message?: Message;
};

export type ResolverSuccess<TFieldValues extends FieldValues = FieldValues> = {
  values: TFieldValues;
  errors: {};
};

export type ResolverError<TFieldValues extends FieldValues = FieldValues> = {
  values: {};
  errors: Record<string, FieldError>;
};

export type ResolverResult<TFieldValues extends FieldValues> =
  | ResolverSuccess<TFieldValues>
  | ResolverError<TFieldValues>;

export type Resolver<TFieldValues extends FieldValues> = (
  values: TFieldValues
) => ResolverResult<TFieldValues>;
