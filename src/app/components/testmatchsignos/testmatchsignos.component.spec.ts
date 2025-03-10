import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmatchsignosComponent } from './testmatchsignos.component';

describe('TestmatchsignosComponent', () => {
  let component: TestmatchsignosComponent;
  let fixture: ComponentFixture<TestmatchsignosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestmatchsignosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestmatchsignosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
