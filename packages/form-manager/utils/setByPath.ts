import { clone } from "ramda";

export function setByPath<T extends any>(path: string, obj: T, value: any): T {
  obj = clone(obj);

  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof current[key] !== "object" || current[key] === null) {
      throw new Error(`Path not found: ${path}`);
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;

  return obj;
}
