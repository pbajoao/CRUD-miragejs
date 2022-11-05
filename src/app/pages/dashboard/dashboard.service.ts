import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) { }

  getUsers() {
    return this.apiService.getUsers().pipe(
      map(r => {
        return r.body;
      })
    );
  }

  deleteUser(request: any) {
    return this.apiService.deleteUser(request);
  }

}
