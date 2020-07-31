import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {StatusService} from '../../infrastructure/services/status.service';
import {AddStatusModalComponent} from './add-status/add-status-modal.component';
import {Status} from '../../domain/Status';
import {AddEditTaskModalComponent} from '../add-edit-task-modal/add-edit-task-modal.component';
import {TaskService} from '../../infrastructure/services/task.service';
import {TaskListComponent} from '../task-list/task-list.component';
import {TaskListService} from '../../infrastructure/services/task-list.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css'],
})
export class StatusListComponent implements OnInit {
  @ViewChild(TaskListComponent) taskListComponent: TaskListComponent[];

  statuses: Status[] = [];

  constructor(
    private modalService: NgbModal,
    protected http: HttpClient,
    protected statusService: StatusService,
    protected taskService: TaskService,
    protected taskListService: TaskListService
  ) {
  }

  ngOnInit(): void {
    this.statusService.getStatuses().subscribe(statuses => this.statuses = statuses);
  }

  public openAddStatus() {
    const modalRef = this.modalService.open(AddStatusModalComponent);
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.title = 'Add new status';
    modalRef.result.then((statusName) => {
      if ('' !== statusName) {
        this.statusService.create(statusName)
          .subscribe(newStatus => this.statuses.push(newStatus));
      }
    });
  }

  openEditStatus(status: Status) {
    const modalRef = this.modalService.open(AddStatusModalComponent);
    modalRef.componentInstance.statusName = status.name;
    modalRef.componentInstance.title = 'Edit status';
    modalRef.result.then((statusName) => {
      if ('' !== statusName) {
        status.name = statusName;
        this.statusService.update(status).subscribe(

        );
      }
    });
  }

  public openAddTask(status: Status): void {
    const modalRef = this.modalService.open(AddEditTaskModalComponent);
    modalRef.componentInstance.title = 'Add new task';
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.statuses = this.statuses;
    modalRef.result.then((newTask) => {
      this.taskService.create(newTask)
        .subscribe((task) => {
          this.taskListService.addTask(task);
        });
    });
  }
}
