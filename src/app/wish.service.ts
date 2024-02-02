import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishService {
  private getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'xyz'
      })
    }
  }

  constructor(private http : HttpClient) { }

  getWishes() {
    let options = this.getStandardOptions();
    return this.http.get('assets/wishes.json', options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // it's a client or network error
      console.error(`There is an issue with the client or network: ${error.error}`)
    } else {
      console.error('Server-side error: ', error.error);
    }

    return throwError(() => new Error('Cannot retrieve wishes from the server'))
  }
}
