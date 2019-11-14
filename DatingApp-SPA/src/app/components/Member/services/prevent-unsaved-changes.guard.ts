import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent): boolean {
    if (component.memberForm.dirty) {
      return confirm('Are You Sure To Want Continue? Any Unsaved Changes Will Be Lost!');
    }
    return true;
  }

}
