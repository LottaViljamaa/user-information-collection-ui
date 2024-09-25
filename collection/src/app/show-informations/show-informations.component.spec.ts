import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInformationsComponent } from './show-informations.component';

describe('ShowInformationsComponent', () => {
  let component: ShowInformationsComponent;
  let fixture: ComponentFixture<ShowInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
