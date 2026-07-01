import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    readonly httpClient = inject(HttpClient);

    get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T>;
    get<T>(url: string, params: HttpParams | undefined, headers: HttpHeaders | undefined, responseType: 'blob'): Observable<HttpResponse<Blob>>;
    get<T>(url: string, params: HttpParams | undefined, headers: HttpHeaders | undefined, responseType: 'response'): Observable<HttpResponse<T>>;
    get<T>(url: string, params?: HttpParams, headers?: HttpHeaders, responseType: 'json' | 'blob' | 'response' = 'json'): Observable<T> | Observable<HttpResponse<Blob>> | Observable<HttpResponse<T>> {
        if (responseType === 'blob') {
            return this.httpClient.get(url, { headers, params, responseType: 'blob', observe: 'response' });
        }

        if (responseType === 'response') {
            return this.httpClient.get<T>(url, { headers, params, observe: 'response' });
        }

        return this.httpClient.get<T>(url, { headers, params });
    }

    post<T>(url: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.post<T>(url, body, { headers, params });
    }

    put<T>(url: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.put<T>(url, body, { headers, params });
    }

    delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.delete<T>(url, { headers, params });
    }
}
