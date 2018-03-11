"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function DirtyRequired(control) {
    if (!control.value && control.dirty) {
        return { dirtyRequired: false };
    }
    return null;
}
exports.DirtyRequired = DirtyRequired;
