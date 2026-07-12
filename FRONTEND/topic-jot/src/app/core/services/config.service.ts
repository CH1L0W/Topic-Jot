import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private readonly httpClient = inject(HttpClient);

    private config: any = {};

    get ApiBaseUrl(): string {
        return this.config.apiBaseUrl;
    }

    async loadConfig() {
        const config = await firstValueFrom(this.httpClient.get('/config.json'));
        this.config = config;
    }
}