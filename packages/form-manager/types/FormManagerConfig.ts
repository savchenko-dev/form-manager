import { FieldValues } from "./FieldValues";

export type FormManagerConfig<TFieldValues extends FieldValues> = {
  values: TFieldValues;
};
