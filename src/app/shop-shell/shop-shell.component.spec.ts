import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopShellComponent } from './shop-shell.component';

describe('ShopShellComponent', () => {
  let component: ShopShellComponent;
  let fixture: ComponentFixture<ShopShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
