import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Quarto } from './quarto';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class QuartoService {

  private quartoUrl = 'http://10.101.151.25:3025/catalog/hotel/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET quartos from the server */
  getQuartos (id: string): Observable<Quarto[]> {
    return this.http.get<Quarto[]>(this.quartoUrl+ id + "/quartos")
      .pipe(
        tap(quarto => this.log('fetched Quartos' + quarto)),
        catchError(this.handleError<Quarto[]>('getQuartos', []))
      );
  }

  /** GET quarto by id. Return `undefined` when id not found */
  getQuartoNo404<Data>(id: number): Observable<Quarto> {
    const url = `${this.quartoUrl}/?id=${id}`;
    return this.http.get<Quarto[]>(url)
      .pipe(
        map(quartos => quartos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Quarto id=${id}`);
        }),
        catchError(this.handleError<Quarto>(`getQuarto id=${id}`))
      );
  }

  /** GET quarto by id. Will 404 if id not found */
  getQuarto(id: string): Observable<Quarto> {
    const url = `http://10.101.151.25:3025/catalog/quarto/`+ id;
    return this.http.get<Quarto>(url).pipe(
      tap(_ => this.log(`fetched Quarto id=${id}`)),
      catchError(this.handleError<Quarto>(`getQuarto id=${id}`))
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a QuartoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuartoService: ${message}`);
  }
}
