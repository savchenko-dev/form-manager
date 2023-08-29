import { AnyIsEqual } from "./AnyIsEqual";
import { ArrayKey } from "./ArrayKey";
import { BrowserNativeObject } from "./BrowserNativeObject";
import { FieldValues } from "./FieldValues";
import { IsTuple } from "./IsTuple";
import { Path } from "./FieldPath";
import { Primitive } from "./Primitive";
import { TupleKeys } from "./TupleKeys";

export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

type ArrayPathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: ArrayPathImpl<K & string, T[K], TraversedTypes>;
      }[TupleKeys<T>]
    : ArrayPathImpl<ArrayKey, V, TraversedTypes>
  : {
      [K in keyof T]-?: ArrayPathImpl<K & string, T[K], TraversedTypes>;
    }[keyof T];

export type IsAny<T> = 0 extends 1 & T ? true : false;

type ArrayPathImpl<K extends string | number, V, TraversedTypes> = V extends
  | Primitive
  | BrowserNativeObject
  ? IsAny<V> extends true
    ? string
    : never
  : V extends ReadonlyArray<infer U>
  ? U extends Primitive | BrowserNativeObject
    ? IsAny<V> extends true
      ? string
      : never
    : true extends AnyIsEqual<TraversedTypes, V>
    ? never
    : `${K}` | `${K}.${ArrayPathInternal<V, TraversedTypes | V>}`
  : true extends AnyIsEqual<TraversedTypes, V>
  ? never
  : `${K}.${ArrayPathInternal<V, TraversedTypes | V>}`;

export type ArrayPath<T> = T extends any ? ArrayPathInternal<T> : never;

export type PathValue<T, P extends Path<T> | ArrayPath<T>> = T extends any
  ? P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? R extends Path<T[K]>
        ? PathValue<T[K], R>
        : never
      : K extends `${ArrayKey}`
      ? T extends ReadonlyArray<infer V>
        ? PathValue<V, R & Path<V>>
        : never
      : never
    : P extends keyof T
    ? T[P]
    : P extends `${ArrayKey}`
    ? T extends ReadonlyArray<infer V>
      ? V
      : never
    : never
  : never;

export type FieldPathValue<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>
> = PathValue<TFieldValues, TFieldPath>;
