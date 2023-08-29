import { BrowserNativeObject, Primitive } from "react-hook-form";

import { AnyIsEqual } from "./AnyIsEqual";
import { ArrayKey } from "./ArrayKey";
import { FieldValues } from "./FieldValues";
import { IsTuple } from "./IsTuple";
import { TupleKeys } from "./TupleKeys";

type PathImpl<K extends string | number, V, TraversedTypes> = V extends
  | Primitive
  | BrowserNativeObject
  ? `${K}`
  : true extends AnyIsEqual<TraversedTypes, V>
  ? `${K}`
  : `${K}` | `${K}.${PathInternal<V, TraversedTypes | V>}`;

type PathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>;
      }[TupleKeys<T>]
    : PathImpl<ArrayKey, V, TraversedTypes>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>;
    }[keyof T];

export type Path<T> = T extends any ? PathInternal<T> : never;

export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;
