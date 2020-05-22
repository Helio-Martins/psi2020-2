import { Injectable } from '@angular/core';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hotel } from './hotel';
//import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class HotelService {

  private hotelUrl = 'http://10.101.151.25:3025/catalog';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    //private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { }

  /** GET heroes from the server */
  getHoteis (): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelUrl)
      .pipe(
        tap(hoteis => {
          for (let hotel of hoteis) {
            let url =  'data:image/' + hotel.foto.contentType + ';base64,' + hotel.foto.bytes;
            hotel.fotoURL = url;
          }
          console.log('fetched Hoteis')}),
        catchError(this.handleError<Hotel[]>('getHoteis', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHotelNo404<Data>(id: number): Observable<Hotel> {
    const url = `${this.hotelUrl}/?id=${id}`;
    return this.http.get<Hotel[]>(url)
      .pipe(
        map(hoteis => hoteis[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} Hotel id=${id}`);
        }),
        catchError(this.handleError<Hotel>(`getHotel id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHotel(id: string): Observable<Hotel> {
    const url = `${this.hotelUrl}/hotel/${id}`;
    return this.http.get<Hotel>(url).pipe(
      tap(hotel => console.log(`fetched Hotel id=${id}` + hotel.fotos[0].contentType)),
      catchError(this.handleError<Hotel>(`getHotel id=${id}`))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService
  private log(message: string) {
    this.messageService.add(`HotelService: ${message}`);
  }*/
}
