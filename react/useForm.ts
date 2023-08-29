import { useCallback, useMemo } from "react";

import { FieldValues } from "form-manager/types/FieldValues";
import { FormManager } from "form-manager/core/FormManger";
import { FormManagerConfig } from "../form-manager/types/FormManagerConfig";
import { Resolver } from "form-manager/types/Resolver";
import { useObservable } from "react-use";

type UseFormConfig<TFieldValues extends FieldValues> = {
  config: FormManagerConfig<TFieldValues> & {
    resolver?: Resolver<TFieldValues>;
  };
};

export const useForm = <TFieldValues extends FieldValues>({
  config,
}: UseFormConfig<TFieldValues>) => {
  const fm = useMemo(() => new FormManager(config), [config]);

  const values = useObservable(fm.values$, config.values);
  const errors = useObservable(fm.errors$, {});

  const handleSubmit = useCallback(
    (...args: Parameters<typeof fm.handleSubmit>) => fm.handleSubmit(...args),
    [fm]
  );

  const setValue = useCallback(
    (...args: Parameters<typeof fm.setValue>) => {
      fm.setValue(...args);
    },
    [fm]
  );

  return {
    values,
    errors,
    handleSubmit,
    setValue,
  };
};
