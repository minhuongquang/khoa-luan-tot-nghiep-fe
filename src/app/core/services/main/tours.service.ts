import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { Tours } from '../../models/main/tours.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})

export class ToursService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    //this.apiUrl = UrlConstant.API.SIGN_UP_FOR_A_TOUR;
  }
  getAll(): Observable<Tours[]> {

    return this.http
      .get<Tours[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<Tours>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ? search : '')
      .set('sort', sort ? sort : '')
      .set('column', column ? column : '');

    return this.http
      .get<PagedResults<Tours>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: Tours): Observable<Tours> {
    return this.http.post<Tours>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: Tours, id: string): Observable<Tours> {
    return this.http.put<Tours>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<Tours> {
    return this.http.delete<Tours>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
