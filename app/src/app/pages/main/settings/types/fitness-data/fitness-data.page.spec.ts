import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FitnessDataPage } from './fitness-data.page';

describe('FitnessDataPage', () => {
  let component: FitnessDataPage;
  let fixture: ComponentFixture<FitnessDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
