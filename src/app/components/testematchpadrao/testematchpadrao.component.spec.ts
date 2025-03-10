import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestematchpadraoComponent } from './testematchpadrao.component';

describe('TestematchpadraoComponent', () => {
  let component: TestematchpadraoComponent;
  let fixture: ComponentFixture<TestematchpadraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestematchpadraoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestematchpadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
