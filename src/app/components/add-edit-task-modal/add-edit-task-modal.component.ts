import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Task} from '../../domain/task';
import {Status} from '../../domain/Status';

@Component({
  selector: 'app-add-edit-task-modal-component',
  templateUrl: './add-edit-task-modal.component.html',
})
export class AddEditTaskModalComponent {
  @Input() task: Task = new Task(0, '', '', 1);
  statuses: Status[] = [];
  title = '';

  constructor(public activeModal: NgbActiveModal) { }

  save(): void {
    this.activeModal.close(this.task);
  }
}
