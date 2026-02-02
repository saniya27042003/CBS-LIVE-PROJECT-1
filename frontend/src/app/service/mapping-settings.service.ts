// mapping-settings.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MappingSettingsService {
  private includeChildrenSubject = new BehaviorSubject<boolean>(false);

  includeChildren$ = this.includeChildrenSubject.asObservable();

  setIncludeChildren(value: boolean) {
    this.includeChildrenSubject.next(value);
  }

  getIncludeChildren(): boolean {
    return this.includeChildrenSubject.value;
  }
}
