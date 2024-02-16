import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessPartnerDetailPage } from './business-partner-detail.page';

describe('BusinessPartnerDetailPage', () => {
  let component: BusinessPartnerDetailPage;
  let fixture: ComponentFixture<BusinessPartnerDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusinessPartnerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
