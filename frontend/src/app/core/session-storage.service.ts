import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // ✅ available across entire app
})
export class SessionStorageService {

  // 🔹 Save any value
  set<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // 🔹 Get value
  get<T>(key: string): T | null {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  }

  // 🔹 Remove single key
  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  // 🔹 Clear ALL session storage
  clear(): void {
    sessionStorage.clear();
  }
}
