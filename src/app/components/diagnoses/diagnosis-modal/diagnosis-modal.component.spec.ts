import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosisModalComponent } from './diagnosis-modal.component';

describe('PatientsComponent', () => {
  let component: DiagnosisModalComponent;
  let fixture: ComponentFixture<DiagnosisModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosisModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiagnosisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
