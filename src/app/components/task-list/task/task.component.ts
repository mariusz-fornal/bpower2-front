import {Component, Input} from '@angular/core';
import {Task} from '../../../domain/task';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditTaskModalComponent} from '../../add-edit-task-modal/add-edit-task-modal.component';
import {TaskService} from '../../../infrastructure/services/task.service';
import {Status} from '../../../domain/Status';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task;
  @Input() statuses: Status[];

  constructor(private modalService: NgbModal, private taskService: TaskService) { }

  openEditTask() {
    const modalRef = this.modalService.open(AddEditTaskModalComponent);
    modalRef.componentInstance.task = this.task;
    modalRef.componentInstance.statuses = this.statuses;
    modalRef.componentInstance.title = 'Edit task';
    modalRef.result.then((updatedTask) => {
      this.task = updatedTask;
      this.taskService.update(updatedTask).subscribe();
    });
  }
}
