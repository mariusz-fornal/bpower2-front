import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Task} from '../../domain/task';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private addTasksSource = new Subject<Task>();

  tasks$ = this.addTasksSource.asObservable();

  addTask(task: Task) {
    this.addTasksSource.next(task);
  }

}
