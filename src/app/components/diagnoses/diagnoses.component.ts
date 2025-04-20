import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosisModalComponent } from './diagnosis-modal/diagnosis-modal.component';

@Component({
  selector: 'app-diagnoses',
  standalone: true,
  imports: [CommonModule, DiagnosisModalComponent, JsonPipe],
  templateUrl: './diagnoses.component.html',
  styleUrl: './diagnoses.component.css'
})

export class DiagnosesComponent implements OnInit {

  http = inject(HttpClient);
  router = inject(Router);

  diagnoses: any[] = [];
  patientProfile: any = {};
  patientHeaderInfo = "";
  patientId = 0;

  diagnosis = {
    patientId: 0,
    diagnosisDate: '',
    complaintOfPatient: '',
    diagnosisOfDoctor: '',
    doctorRemarks: ''
  };

  currentPage = 1;
  totalPages = 1;

  isModalVisible = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.patientId = Number(params['patient_id']);
    });
    this.getDiagnoses();
  }

  getDiagnoses() {
    this.http.get(`https://localhost:7117/api/Patient/${this.patientId}`).subscribe((response: any) => {
      if (response.success) {
        this.patientProfile = response.data;
        this.diagnoses = response.data.diagnoses;
        const age = new Date().getFullYear() - new Date(this.patientProfile.birthdate).getFullYear();
        this.patientHeaderInfo = `${this.patientProfile.name} ${this.patientProfile.surname} | ${age}`;
      } else {
        alert(response.message);
      }
    })
  }

  openDiagnosisModal() {
    this.isModalVisible = true;
  }

  backToPatients() {
    this.router.navigateByUrl('patients');
  }

  askToGailenus() {
    const request = {
      birthdate: this.patientProfile.birthdate,
      details: this.diagnoses
    }
    this.http.post("https://localhost:7117/api/GAIlenus/askToGAIlenus", request).subscribe((response: any) => {
      if (response.success) {
        alert(JSON.stringify(response.data));
      } else {
        alert(response.message);
      }
    });
  }

  changePage(pageNumber: any) {
    return;
  }

  onDiagnosisSaved(d: any) {
    this.diagnosis = {
      patientId: this.patientId,
      diagnosisDate: new Date(d.diagnosisDate).toISOString(),
      complaintOfPatient: d.complaintOfPatient,
      diagnosisOfDoctor: d.diagnosisOfDoctor,
      doctorRemarks: d.doctorRemarks
    };

    this.http.post("https://localhost:7117/api/Patient/createDiagnosis", this.diagnosis).subscribe((response: any) => {
      if (response.success) {
        this.getDiagnoses();
      } else {
        alert(response.message);
      }
    });
    this.closeModal();
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
