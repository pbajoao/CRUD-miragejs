import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiUrl = '/api/users';

    constructor(private http: HttpClient) { }

    public getUsers(): Observable<HttpResponse<any>> {
        return this.http.get<Array<any>>(this.apiUrl, { observe: 'response' });
    }

    public addUser(request: any): Observable<HttpResponse<any>> {
        return this.http.post(this.apiUrl, request, { observe: 'response' });
    }

    public updateUser(request: any): Observable<HttpResponse<any>> {
        return this.http.put(this.apiUrl, request, { observe: 'response' });
    }

    public deleteUser(id: number): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.apiUrl}/${id}`, { observe: 'response' });
    }
}
