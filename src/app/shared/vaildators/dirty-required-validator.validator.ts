import {AbstractControl} from '@angular/forms';

export function DirtyRequired(control: AbstractControl) {
  if (!control.value && control.dirty) {
    return {dirtyRequired: false};
  }
  return null;
}
