import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ReservaService } from '../reserva.service';
import { Reserva } from '../reserva';

@Component({
    selector: 'app-process-reserva',
    templateUrl: './process-reserva.component.html',
    styleUrls: ['./process-reserva.component.css']
})

export class ProcessReservaComponent implements OnInit {

    reserva: Reserva;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private reservaService: ReservaService
    ) {}

    ngOnInit() {
        this.getReserva();
    }

    getReserva(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.reservaService.getReserva(id)
            .subscribe(reserva => this.reserva = reserva);
    }

    goBack(): void {
        this.location.back();
    }
}