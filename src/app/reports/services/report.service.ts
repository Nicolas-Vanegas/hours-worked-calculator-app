import { environment as env } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from 'src/app/interfaces/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  crearReporte(report: Report): Observable<Report> {
    debugger;
    const headers = new HttpHeaders({
      Authorization: env.authorization,
    });
    return this.http.post<Report>(`${env.apiUrl}/report`, report, {
      headers,
    });
  }
}
