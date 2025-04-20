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
        this.patientHeaderInfo = `${this.patientProfile.name} ${this.patientProfile.surname} | ${this.patientProfile.birthdate}`;
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
  }

  changePage(pageNumber: any) {
    return;
  }


  onDiagnosisSaved(p: any) {
    this.closeModal();
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
