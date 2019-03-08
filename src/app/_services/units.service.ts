import { UnitEnum } from './../_models/unit.enum';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UnitsService {

	constructor(private http: HttpClient) {
	}

	getUnits(): Observable<UnitEnum> {
		return this.http.get<UnitEnum>('units');
	}

}
