import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductInformationPage } from './product-information.page';

describe('ProductInformationPage', () => {
  let component: ProductInformationPage;
  let fixture: ComponentFixture<ProductInformationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
