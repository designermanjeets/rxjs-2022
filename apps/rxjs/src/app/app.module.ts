import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TodosPendingComponent } from './todos-pending/todos-pending.component';
import { TodosCompletedComponent } from './todos-completed/todos-completed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { ObsConcatinationComponent } from './obs-concatination/obs-concatination.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ObsMergeCombinationComponent } from './obs-merge-combination/obs-merge-combination.component';
import { ObsExhaustComponent } from './obs-exhaust/obs-exhaust.component';
import { ObsSwitchComponent } from './obs-switch/obs-switch.component';
import { ObsErrorHandleComponent } from './obs-error-handle/obs-error-handle.component';
import { ObsCustomComponent } from './obs-custom/obs-custom.component';
import { ObsForkJoinComponent } from './obs-fork-join/obs-fork-join.component';
import { ObsWithLatestFromComponent } from './obs-with-latest-from/obs-with-latest-from.component';
import { ObsOperatorsComponent } from './obs-operators/obs-operators.component';

const routes: Routes = [
  { path: 'operators', component: ObsOperatorsComponent },
  { path: 'concat', component: ObsConcatinationComponent },
  { path: 'merge', component: ObsMergeCombinationComponent },
  { path: 'exhaust', component: ObsExhaustComponent },
  { path: 'switch', component: ObsSwitchComponent },
  { path: 'forkjoin', component: ObsForkJoinComponent },
  { path: 'withlatestfrom', component: ObsWithLatestFromComponent },
  { path: 'error', component: ObsErrorHandleComponent },
  { path: 'custom', component: ObsCustomComponent },
  { path: '', redirectTo: '/concat', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    TodosPendingComponent,
    TodosCompletedComponent,
    ObsConcatinationComponent,
    ObsMergeCombinationComponent,
    ObsExhaustComponent,
    ObsSwitchComponent,
    ObsErrorHandleComponent,
    ObsCustomComponent,
    ObsForkJoinComponent,
    ObsWithLatestFromComponent,
    ObsOperatorsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
