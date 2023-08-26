import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { FieldValues } from "./types/FieldValues";
import { FormManagerConfig } from "./types/FormManagerConfig";
import { FormManagerInterface } from "./FormMangerInterface";
import { Path } from "./types/FieldPath";
import { PathValue } from "./types/FieldPathValue";
import { setByPath } from "./utils/setByPath";

export class FormManager<TFieldValues extends FieldValues>
  implements FormManagerInterface<TFieldValues>
{
  readonly values$: BehaviorSubject<TFieldValues>;
  readonly errors$: any;

  constructor(config: FormManagerConfig<TFieldValues>) {
    this.values$ = new BehaviorSubject<TFieldValues>(config.values);
  }

  setValue<TFieldName extends Path<TFieldValues>>(
    name: TFieldName,
    value: PathValue<TFieldValues, TFieldName>
  ): void {
    const values = this.values$.getValue();
    const newValues = setByPath(name, values, value);
    this.values$.next(newValues);
  }

  getValues() {
    return this.values$.getValue();
  }

  handleSubmit(handler: (data: TFieldValues) => void): () => void {
    return () => {
      handler(this.getValues());
    };
  }
}
