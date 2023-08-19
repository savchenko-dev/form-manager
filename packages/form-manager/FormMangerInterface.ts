import { FieldPath } from "./types/FieldPath";
import { FieldPathValue } from "./types/FieldPathValue";
import { Observable } from "rxjs";

export interface FormManagerInterface<
  TFieldValues extends Record<string, any>
> {
  readonly values$: Observable<TFieldValues>;
  readonly errors$: any;

  setValue<TFieldName extends FieldPath<TFieldValues>>(
    name: TFieldName,
    value: FieldPathValue<TFieldValues, TFieldName>
  ): void;

  getValues(): TFieldValues;

  handleSubmit(handler: () => void): () => void;
}
