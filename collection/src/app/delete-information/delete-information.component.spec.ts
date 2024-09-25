import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInformationComponent } from './delete-information.component';

describe('DeleteInformationComponent', () => {
  let component: DeleteInformationComponent;
  let fixture: ComponentFixture<DeleteInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
