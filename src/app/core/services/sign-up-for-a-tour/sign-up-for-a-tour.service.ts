import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})

export class SignUpForATourService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    //this.apiUrl = UrlConstant.API.SIGN_UP_FOR_A_TOUR;
  }
  getAll(): Observable<SignUpForATourService[]> {

    return this.http
      .get<SignUpForATourService[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<SignUpForATourService>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ? sort : '')
      .set('column', column ? column : '');

    return this.http
      .get<PagedResults<SignUpForATourService>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: SignUpForATourService): Observable<SignUpForATourService> {
    return this.http.post<SignUpForATourService>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: SignUpForATourService, id: string): Observable<SignUpForATourService> {
    return this.http.put<SignUpForATourService>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<SignUpForATourService> {
    return this.http.delete<SignUpForATourService>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
