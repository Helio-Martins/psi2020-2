import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Reserva } from './reserva';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ReservaService {

    private quartoUrl = 'http://10.101.151.25:3025/catalog/hotel/quartos';

    constructor (
        private http: HttpClient,
        private messageService: MessageService) { }

    /** Log a QuartoService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`QuartoService: ${message}`);
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getReserva(id: String): Observable<Reserva> {
        const url = `http://10.101.151.25:3025/catalog/reserva`+ id;
        return this.http.get<Reserva>(url).pipe(
            tap(_ => this.log(`fetched reserva id=${id}`)),
            catchError(this.handleError<Reserva>(`getRserva id=${id}`))
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
}