import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly httpClient = inject(HttpClient);
    private readonly config = inject(ConfigService);

    get<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T>;
    get<T>(endpoint: string, params: HttpParams | undefined, headers: HttpHeaders | undefined, responseType: 'blob'): Observable<HttpResponse<Blob>>;
    get<T>(endpoint: string, params: HttpParams | undefined, headers: HttpHeaders | undefined, responseType: 'response'): Observable<HttpResponse<T>>;
    get<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders, responseType: 'json' | 'blob' | 'response' = 'json'): Observable<T> | Observable<HttpResponse<Blob>> | Observable<HttpResponse<T>> {
        if (responseType === 'blob') {
            return this.httpClient.get(`${this.config.ApiBaseUrl}/${endpoint}`, { headers, params, responseType: 'blob', observe: 'response' });
        }

        if (responseType === 'response') {
            return this.httpClient.get<T>(`${this.config.ApiBaseUrl}/${endpoint}`, { headers, params, observe: 'response' });
        }

        return this.httpClient.get<T>(`${this.config.ApiBaseUrl}/${endpoint}`, { headers, params });
    }

    post<T>(endpoint: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.post<T>(`${this.config.ApiBaseUrl}/${endpoint}`, body, { headers, params });
    }

    put<T>(endpoint: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.put<T>(`${this.config.ApiBaseUrl}/${endpoint}`, body, { headers, params });
    }

    delete<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.delete<T>(`${this.config.ApiBaseUrl}/${endpoint}`, { headers, params });
    }
}
