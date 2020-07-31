import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Status} from '../../domain/Status';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private statusesUrl = 'http://localhost:8080/statuses';

  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusesUrl)
      .pipe(
        catchError(this.handleError<Status[]>('getStatuses', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  public create(statusName) {
    return this.http.post<Status>(this.statusesUrl, {name: statusName}, {headers: this.headers});
  }

  public update(status: Status) {
    return this.http.put(this.statusesUrl + '/' + status.id, {name: status.name}, {headers: this.headers});
  }
}
