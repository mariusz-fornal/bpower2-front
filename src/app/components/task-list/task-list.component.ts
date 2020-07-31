import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../domain/task';
import {TaskService} from '../../infrastructure/services/task.service';
import {Status} from '../../domain/Status';
import {TaskListService} from '../../infrastructure/services/task-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() statuses: Status[];
  @Input() status: Status;
  tasks: Task[] = [];
  subscription: Subscription;

  constructor(private taskService: TaskService, protected taskListService: TaskListService) {
    this.subscription = taskListService.tasks$.subscribe((task) => {
      if (+this.status.id === +task.status) {
        this.tasks.push(task);
      }
    });
  }

  ngOnInit(): void {
    this.taskService.getTasksByStatus(this.status.id).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

}
