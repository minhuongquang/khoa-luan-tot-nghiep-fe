import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})

export class SignUpForATourContactedService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    //this.apiUrl = UrlConstant.API.SIGN_UP_FOR_A_TOUR_CONTACTED;
  }
  getAll(): Observable<SignUpForATourContactedService[]> {
    return this.http
      .get<SignUpForATourContactedService[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<SignUpForATourContactedService>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ? sort : '')
      .set('column', column ? column : '');

    return this.http
      .get<PagedResults<SignUpForATourContactedService>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: SignUpForATourContactedService): Observable<SignUpForATourContactedService> {
    return this.http.post<SignUpForATourContactedService>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: SignUpForATourContactedService, id: string): Observable<SignUpForATourContactedService> {
    return this.http.put<SignUpForATourContactedService>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<SignUpForATourContactedService> {
    return this.http.delete<SignUpForATourContactedService>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
