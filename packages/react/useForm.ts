import { useCallback, useMemo } from "react";

import { FieldValues } from "../form-manager/types/FieldValues";
import { FormManager } from "../form-manager/FormManger";
import { FormManagerConfig } from "../form-manager/types/FormManagerConfig";
import { useObservable } from "react-use";

type UseFormConfig<TFieldValues extends FieldValues> = {
  config: FormManagerConfig<TFieldValues>;
};

export const useForm = <TFieldValues extends FieldValues>({
  config,
}: UseFormConfig<TFieldValues>) => {
  const fm = useMemo(() => new FormManager(config), [config]);

  const values = useObservable(fm.values$, config.values);

  const handleSubmit = useCallback(
    (...args: Parameters<typeof fm.handleSubmit>) => fm.handleSubmit(...args),
    [fm]
  );

  const setValue = useCallback(
    (...args: Parameters<typeof fm.setValue>) => fm.setValue(...args),
    [fm]
  );

  return {
    values,
    handleSubmit,
    setValue,
  };
};
