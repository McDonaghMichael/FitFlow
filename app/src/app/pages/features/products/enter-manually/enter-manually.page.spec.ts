import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterManuallyPage } from './enter-manually.page';

describe('EnterManuallyPage', () => {
  let component: EnterManuallyPage;
  let fixture: ComponentFixture<EnterManuallyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterManuallyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
