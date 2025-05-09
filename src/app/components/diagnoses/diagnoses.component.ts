import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosisModalComponent } from './diagnosis-modal/diagnosis-modal.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-diagnoses',
  standalone: true,
  imports: [CommonModule, DiagnosisModalComponent],
  templateUrl: './diagnoses.component.html',
  styleUrl: './diagnoses.component.css'
})

export class DiagnosesComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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

  gailenusResult: any = {};
  showGailenusResult = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.patientId = Number(params['patient_id']);
    });
    this.getDiagnoses();
  }

  getDiagnoses() {
    this.apiService.get<any>(`Patient/${this.patientId}`).subscribe((response: any) => {
      if (response.success) {
        this.showGailenusResult = false;
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
    this.apiService.post("GAIlenus/askToGAIlenus", request).subscribe((response: any) => {
      if (response.success) {
        this.gailenusResult = response.data;
        this.showGailenusResult = true;
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

    this.apiService.post("Patient/createDiagnosis", this.diagnosis).subscribe((response: any) => {
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
