import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendHeaderComponent } from './send-header.component';

describe('SendHeaderComponent', () => {
  let component: SendHeaderComponent;
  let fixture: ComponentFixture<SendHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
