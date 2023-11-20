import { ComponentFixture } from '@angular/core/testing';

export function findNativeEl<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement | null {
  const nativeElement = fixture.nativeElement.querySelector(selector);
  return nativeElement;
}

export function setValue<T>(fixture: ComponentFixture<T>, selector: string, value: string): void {
  const nativeElement = findNativeEl(fixture, selector) as HTMLInputElement;
  if (nativeElement) {
    nativeElement.value = value;
    nativeElement.dispatchEvent(new Event('input'));
  }
}