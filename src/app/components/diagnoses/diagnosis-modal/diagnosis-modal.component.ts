import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diagnosis-modal',
  templateUrl: './diagnosis-modal.component.html',
  styleUrls: ['./diagnosis-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA] 
})

export class DiagnosisModalComponent {
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() onDiagnosisSaved = new EventEmitter<any>();
  
  diagnosis = {
    diagnosisDate: new Date(),
    complaintOfPatient: '',
    diagnosisOfDoctor: '',
    doctorRemarks: ''
  };

  saveDiagnosis() {
    const newDiagnosis = {...this.diagnosis};
    this.onDiagnosisSaved.emit(newDiagnosis);
    this.resetForm();
  }
  
  resetForm() {
    this.diagnosis = {
      diagnosisDate: new Date(),
      complaintOfPatient: '',
      diagnosisOfDoctor: '',
      doctorRemarks: ''
    };
  }

  close() {
    this.closeModal.emit();
  }
}