import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessPartnerPage } from './business-partner.page';

describe('BusinessPartnerPage', () => {
  let component: BusinessPartnerPage;
  let fixture: ComponentFixture<BusinessPartnerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusinessPartnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
