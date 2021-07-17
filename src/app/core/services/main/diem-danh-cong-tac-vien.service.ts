import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagedResults } from '../../models/common/response-page.model';
import { CongTacVien } from '../../models/main/cong-tac-vien.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DiemDanhCongTacVienService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    //this.apiUrl = UrlConstant.API.SIGN_UP_FOR_A_TOUR;
  }

  getAll(): Observable<CongTacVien[]> {

    return this.http
      .get<CongTacVien[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<CongTacVien>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ? search : '')
      .set('sort', sort ? sort : '')
      .set('column', column ? column : '');

    return this.http
      .get<PagedResults<CongTacVien>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: CongTacVien): Observable<CongTacVien> {
    return this.http.post<CongTacVien>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: CongTacVien, id: string): Observable<CongTacVien> {
    return this.http.put<CongTacVien>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<CongTacVien> {
    return this.http.delete<CongTacVien>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
