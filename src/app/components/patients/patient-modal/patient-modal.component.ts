import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-modal',
  templateUrl: './patient-modal.component.html',
  styleUrls: ['./patient-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA] 
})

export class PatientModalComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() editedPatient: any = null; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() onPatientSaved = new EventEmitter<any>();
  
  isEditMode = false;

  patient = {
    id: 0,
    name: '',
    surname: '',
    birthdate: new Date()
  };

  ngOnChanges(changes: SimpleChanges) {
    // editPatientData değiştiğinde formu güncelle
    if (changes['editedPatient'] && changes['editedPatient'].currentValue) {
      this.isEditMode = true;
      // Mevcut hasta verisini form nesnesine kopyala
      this.patient = {...changes['editedPatient'].currentValue};
    } else if (changes['isVisible'] && changes['isVisible'].currentValue === true && !this.editedPatient) {
      // Yeni hasta eklerken formu sıfırla
      this.isEditMode = false;
      this.resetForm();
    }
  }

  savePatient() {
    let newPatient = {...this.patient};
    this.onPatientSaved.emit(newPatient);
    this.resetForm();
  }
  
  resetForm() {
    this.patient = {
      id: 0,
      name: '',
      surname: '',
      birthdate: new Date()
    };
  }

  close() {
    this.closeModal.emit();
  }
}