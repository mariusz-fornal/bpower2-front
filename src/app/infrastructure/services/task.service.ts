import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Task} from '../../domain/task';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksToCategoryUrl = 'http://localhost:8080/tasks?filter[status]=';
  private tasksUrl = 'http://localhost:8080/tasks';

  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getTasksByStatus(categoryId: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksToCategoryUrl + categoryId)
      .pipe(
        catchError(this.handleError<Task[]>('getTasks', [])),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  public create(task: Task) {
    const body = {
      title: task.title,
      owner: task.owner,
      status: task.status
    };
    return this.http.post<Task>(this.tasksUrl, JSON.stringify(body), {headers: this.headers});
  }

  public update(task: Task) {
    const body = {
      title: task.title,
      owner: task.owner,
      status: task.status
    };
    return this.http.put(this.tasksUrl + '/' + task.id, body, {headers: this.headers});
  }
}
