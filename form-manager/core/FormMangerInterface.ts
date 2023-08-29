import { FieldPath } from "../types/FieldPath";
import { FieldPathValue } from "../types/FieldPathValue";
import type { Observable } from "rxjs";
import { Resolver } from "../types/Resolver";

export interface FormManagerInterface<
  TFieldValues extends Record<string, any>
> {
  readonly values$: Observable<TFieldValues>;

  setValue<TFieldName extends FieldPath<TFieldValues>>(
    name: TFieldName,
    value: FieldPathValue<TFieldValues, TFieldName>
  ): void;

  getValues(): TFieldValues;

  handleSubmit(handler: () => void): () => void;

  validate(resolver: Resolver<TFieldValues>): void;
}
