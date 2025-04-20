import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PatientModalComponent } from './patient-modal/patient-modal.component';


@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, PatientModalComponent, JsonPipe],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {

  http = inject(HttpClient);
  router = inject(Router);

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
    this.http.get("https://localhost:7117/api/Patient/getPatients").subscribe((response: any) => {
      if (response.success) {
        this.patients = response.data;
      } else {
        alert(response.message);
      }
    })
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

  deletePatient(id: any) {
    this.http.delete(`https://localhost:7117/api/Patient/${id}`).subscribe((response: any) => {
      if (response.success) {
        this.getPatients();
      } else {
        alert(response.message);
      }
    })
  }

  changePage(pageNumber: any) {
    return;
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem('gAIlenusToken');
    this.router.navigateByUrl('login')
  }

  onPatientSaved(p: any) {
    this.patient = {
      name: p.name,
      surname: p.surname,
      birthdate: new Date(p.birthdate).toISOString() 
    };

    if (p.id === 0) {
      this.http.post("https://localhost:7117/api/Patient/createPatient", this.patient).subscribe((response: any) => {
        if (response.success) {
          this.getPatients();
        } else {
          alert(response.message);
        }
      });
    } else {
      this.http.put(`https://localhost:7117/api/Patient/${p.id}`, this.patient).subscribe((response: any) => {
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

  closeModal() {
    this.isModalVisible = false;
  }
}
