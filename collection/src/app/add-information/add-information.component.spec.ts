import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInformationComponent } from './add-information.component';

describe('AddInformationComponent', () => {
  let component: AddInformationComponent;
  let fixture: ComponentFixture<AddInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
