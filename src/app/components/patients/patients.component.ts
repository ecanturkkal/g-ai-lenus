import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {

  http = inject(HttpClient);
  router = inject(Router);
  patients: any[] = [];
  currentPage = 1;
  totalPages = 1;

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

  createNewPatient() {
    alert("createNewPatient");
  }

  viewDiagnoses(id: any) {
    alert("viewDiagnoses " + id);
  }

  editPatient(id: any) {
    alert("editPatient " + id);
  }

  deletePatient(id: any) {
    alert("deletePatient " + id);
  }

  changePage(pageNumber: any) {
    alert("changePage " + pageNumber);
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem('gAIlenusToken');
    this.router.navigateByUrl('login')
  }
}
