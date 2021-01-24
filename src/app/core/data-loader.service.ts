import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataLoaderService {
  constructor(private httpClient: HttpClient) {}

  public loadUsersData(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>("http://localhost:3002/users/");
  }

  public loadUserData(id: string): Observable<any> {
    return this.httpClient.get<Array<any>>(`http://localhost:3002/users/${id}`);
  }
}
