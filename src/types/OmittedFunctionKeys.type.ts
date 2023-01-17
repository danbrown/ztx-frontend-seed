import { GetFunctionKeys } from "./GetFunctionKeys.type";

export type OmittedFunctionKeys<T> = Omit<T, GetFunctionKeys<T>>;
