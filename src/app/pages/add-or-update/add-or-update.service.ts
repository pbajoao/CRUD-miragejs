import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AddOrUpdateService {

  constructor(private apiService: ApiService) { }

  addUser(request: any) {
    return this.apiService.addUser(request).pipe(
      map(r => {
        return r.body;
      })
    );
  }

  updateUser(request: any) {
    return this.apiService.updateUser(request).pipe(
      map(r => {
        return r.body;
      })
    );
  }
}
