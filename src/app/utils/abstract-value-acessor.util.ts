import { forwardRef, InjectionToken, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface IMakeProvider {
  provide: InjectionToken<readonly ControlValueAccessor[]>;
  useExisting: Type<any>;
  multi: boolean;
}

export function makeProvider<T>(component: Type<T>): IMakeProvider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true
  };
}

export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  value!: T;
  disabled!: boolean;

  onChanged!: (value: T) => void;
  onTouched!: () => void;
  afterValueUpdate(_value: T): void {}

  writeValue(value: T): void {
    if (value !== null) {
      this.value = value;
      this.onChanged(this.value);
      this.afterValueUpdate(this.value);
    }
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
