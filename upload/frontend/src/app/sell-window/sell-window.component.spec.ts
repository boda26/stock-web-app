import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellWindowComponent } from './sell-window.component';

describe('SellWindowComponent', () => {
  let component: SellWindowComponent;
  let fixture: ComponentFixture<SellWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
