import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCheckBoxComponent } from './common-check-box.component';

describe('CommonCheckBoxComponent', () => {
  let component: CommonCheckBoxComponent;
  let fixture: ComponentFixture<CommonCheckBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonCheckBoxComponent],
    });
    fixture = TestBed.createComponent(CommonCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
