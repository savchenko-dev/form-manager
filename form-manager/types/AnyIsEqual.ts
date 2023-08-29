import { IsEqual } from "./IsEqual";

export type AnyIsEqual<T1, T2> = T1 extends T2
  ? IsEqual<T1, T2> extends true
    ? true
    : never
  : never;
