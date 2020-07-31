import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TaskComponent} from './components/task-list/task/task.component';
import {HttpClientModule} from '@angular/common/http';
import {AddStatusModalComponent} from './components/status-list/add-status/add-status-modal.component';
import {StatusListComponent} from './components/status-list/status-list.component';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {AddEditTaskModalComponent} from './components/add-edit-task-modal/add-edit-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    StatusListComponent,
    TaskComponent,
    AddStatusModalComponent,
    AddEditTaskModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
