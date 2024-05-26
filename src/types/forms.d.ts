import { Observable } from 'rxjs';

declare module '@angular/forms' {
  export abstract class TypedAbstractControl<T> extends AbstractControl {
    readonly value: T | null | undefined;
    readonly valueChanges: Observable<T | null | undefined>;

    abstract setValue(value: T | null | undefined, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    abstract patchValue(value: Partial<T> | T | null | undefined, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  }

  export class TypedFormControl<T> extends FormControl {
    readonly value: T | null | undefined;
    readonly valueChanges: Observable<T | null | undefined>;

    setValue(value: T | null | undefined, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    patchValue(value: T | null | undefined, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  }

  export class TypedFormGroup<T extends object> extends FormGroup {
    readonly value: { [P in keyof T]: T[P] | null | undefined };
    readonly valueChanges: Observable<{ [P in keyof T]: T[P] | null | undefined }>;

    readonly controls: { [P in keyof T]: TypedAbstractControl<T[P]> };

    setValue(value: T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    patchValue(value: Partial<T> | T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    get<R = T[Extract<keyof T, string>]>(path: Extract<keyof T, string>): R extends T[typeof path] ? TypedFormControl<R> : never;
  }

  export class TypedFormArray<T> extends FormArray {
    readonly value: T[];
    readonly valueChanges: Observable<T[]>;

    readonly controls: TypedAbstractControl<T>[];

    setValue(value: T[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    patchValue(value: T[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    at(index: number): TypedAbstractControl<T>;
  }
}
