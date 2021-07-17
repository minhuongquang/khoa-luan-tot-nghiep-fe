import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})

export class RegistrationForLeadTheDelegationService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    //this.apiUrl = UrlConstant.API.SIGN_UP_FOR_A_TOUR;
  }
  getAll(): Observable<RegistrationForLeadTheDelegationService[]> {

    return this.http
      .get<RegistrationForLeadTheDelegationService[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<RegistrationForLeadTheDelegationService>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ? sort : '')
      .set('column', column ? column : '');

    return this.http
      .get<PagedResults<RegistrationForLeadTheDelegationService>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: RegistrationForLeadTheDelegationService): Observable<RegistrationForLeadTheDelegationService> {
    return this.http.post<RegistrationForLeadTheDelegationService>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: RegistrationForLeadTheDelegationService, id: string): Observable<RegistrationForLeadTheDelegationService> {
    return this.http.put<RegistrationForLeadTheDelegationService>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<RegistrationForLeadTheDelegationService> {
    return this.http.delete<RegistrationForLeadTheDelegationService>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
