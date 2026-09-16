import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

const MODE_KEY = 'laborhelm.demo';
const DATA_KEY = 'laborhelm.demo.data';

/**
 * The URL the tab was opened with, captured while this module is evaluated.
 *
 * This has to happen at import time. The app routes with `useHash`, and
 * Angular's HashLocationStrategy replaces the address with a hash-only URL on
 * its first navigation - which drops any `?demo=1` that sat before the '#'
 * before a service constructor ever gets to look at it.
 */
const BOOT_URL = typeof window !== 'undefined' ? window.location.href : '';

/**
 * Owns whether the app is running on demo data, and lets the visitor leave or
 * reset it.
 *
 * Demo mode turns on from three places, in this order:
 *
 *   1. `environment.demoMode`, baked in at build time by scripts/set-env.js
 *      from the DEMO_MODE variable. This is how the hosted demo runs, and it
 *      cannot be switched off from the UI.
 *   2. `?demo=1` anywhere in the URL, which also persists the choice. That
 *      makes a shareable link: /#/dashboard?demo=1.
 *   3. The stored flag from a previous visit, so a reload stays in the demo.
 *
 * A deployment pointed at a real backend therefore stays out of demo mode
 * unless someone explicitly asks for it.
 */
@Injectable({ providedIn: 'root' })
export class DemoService {

  /** True when DEMO_MODE was baked in; the UI cannot turn this off. */
  readonly forced: boolean = environment.demoMode;

  private readonly active$ = new BehaviorSubject<boolean>(false);
  private readonly reset$ = new Subject<void>();

  constructor() {
    this.active$.next(this.forced || this.readUrlFlag() || this.readStoredFlag());
  }

  /** Whether the app is currently running on demo data. */
  get active(): boolean {
    return this.active$.value;
  }

  /** Emits on every change of demo mode. */
  get active$$(): Observable<boolean> {
    return this.active$.asObservable();
  }

  /**
   * Emits when the visitor resets the demo. Pages subscribe to this to reload
   * their rows from the freshly re-seeded store.
   */
  get resets$(): Observable<void> {
    return this.reset$.asObservable();
  }

  /** Turns demo mode on and remembers it across reloads. */
  enable(): void {
    this.write(MODE_KEY, '1');
    this.active$.next(true);
  }

  /**
   * Leaves demo mode and drops the stored catalogue. No-op when DEMO_MODE was
   * baked in, since there would be no backend to fall back to.
   */
  disable(): void {
    if (this.forced) {
      return;
    }
    this.remove(MODE_KEY);
    this.remove(DATA_KEY);
    this.active$.next(false);
  }

  /**
   * Throws away edits made during the visit. The store re-seeds on the next
   * read; `resets$` tells the open page to pull the new rows.
   */
  reset(): void {
    this.remove(DATA_KEY);
    this.reset$.next();
  }

  // --- Persistence ------------------------------------------------------
  // Private browsing and blocked site-data both make localStorage throw on
  // access rather than return null, so every call is guarded. Demo mode still
  // works without it - the catalogue just resets on reload.

  readData<T>(): T | null {
    try {
      const raw = localStorage.getItem(DATA_KEY);
      return raw ? JSON.parse(raw) as T : null;
    } catch {
      return null;
    }
  }

  writeData(data: unknown): void {
    this.write(DATA_KEY, JSON.stringify(data));
  }

  private readStoredFlag(): boolean {
    try {
      return localStorage.getItem(MODE_KEY) === '1';
    } catch {
      return false;
    }
  }

  /**
   * Looks for `demo=1` in the URL the tab was opened with.
   *
   * Both forms work: `/#/dashboard?demo=1`, which survives because the router
   * owns everything after the '#', and `/?demo=1#/dashboard`, which does not
   * survive the first navigation - hence reading BOOT_URL rather than the
   * current address. `/#/dashboard?demo=1` is the one to share.
   */
  private readUrlFlag(): boolean {
    if (!/[?&]demo=1(?:[&#]|$)/.test(BOOT_URL)) {
      return false;
    }
    this.write(MODE_KEY, '1');
    return true;
  }

  private write(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage unavailable: demo mode stays in memory for this page only.
    }
  }

  private remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // Nothing to clean up if storage was never writable.
    }
  }
}
