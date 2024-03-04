import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  serviceHost = 'https://crudcrud.com/api/8bf27eca10f24f72a36ea1cd6bd769d0/';

  constructor(private http: HttpClient) { }

  // GET FUNCTION 
  getFunction(url: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.serviceHost + url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // POST FUNCTION
  postFunction(url: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.serviceHost + url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // PUT FUNCTION
  putFunction(url: any, _id: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.serviceHost + url + _id, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE FUNCTION
  deleteFunction(url: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.serviceHost + url + data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
