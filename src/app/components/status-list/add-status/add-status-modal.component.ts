import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-status-modal',
  templateUrl: './add-status-modal.component.html',
})
export class AddStatusModalComponent {
  statusName = '';
  title = '';

  constructor(public activeModal: NgbActiveModal) {}

  save(): void {
    this.activeModal.close(this.statusName);
  }
}
