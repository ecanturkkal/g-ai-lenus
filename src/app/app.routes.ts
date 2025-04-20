import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { PatientsComponent } from './components/patients/patients.component';
import { DiagnosesComponent } from './components/diagnoses/diagnoses.component';

export const routes: Routes = [
    { path:'', redirectTo: 'login', pathMatch:'full'},
    { path: 'login', component: LoginComponent },
    { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard] },
    { path: 'diagnoses', component: DiagnosesComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'patients' },
];

