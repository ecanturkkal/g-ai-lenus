import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PatientModalComponent } from './patient-modal/patient-modal.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, PatientModalComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})

export class PatientsComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  patients: any[] = [];
  selectedPatient: any = null;

  patient = {
    name: '',
    surname: '',
    birthdate: ''
  };

  currentPage = 1;
  totalPages = 1;

  isModalVisible = false;

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.apiService.get<any>('Patient/getPatients').subscribe((response: any) => {
      if (response.success) {
        this.patients = response.data;
      } else {
        alert(response.message);
      }
    });
  }

  onPatientSaved(p: any) {
    this.patient = {
      name: p.name,
      surname: p.surname,
      birthdate: new Date(p.birthdate).toISOString() 
    };

    if (p.id === 0) {
      this.apiService.post<any>('Patient/createPatient', this.patient).subscribe((response: any) => {
        if (response.success) {
          this.getPatients();
        } else {
          alert(response.message);
        }
      });
    } else {
      this.apiService.put<any>(`Patient/${p.id}`, this.patient).subscribe((response: any) => {
        if (response.success) {
          this.getPatients();
        } else {
          alert(response.message);
        }
      });
    }
    this.selectedPatient = null;
    this.closeModal();
  }

  deletePatient(id: any) {
    this.apiService.delete<any>(`Patient/${id}`).subscribe((response: any) => {
      if (response.success) {
        this.getPatients();
      } else {
        alert(response.message);
      }
    });
  }

  changePage(pageNumber: any) {
    return;
  }

  openPatientModal() {
    this.isModalVisible = true;
  }

  viewDiagnoses(id: any) {
    this.router.navigate(['/diagnoses'], { queryParams: { patient_id: id } });
  }

  editPatient(patient: any) {
    this.openPatientModal();
    this.selectedPatient = patient;
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem('gAIlenusToken');
    this.router.navigateByUrl('login')
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
