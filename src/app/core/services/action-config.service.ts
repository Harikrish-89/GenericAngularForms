import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActionConfig } from "../config/ActionConfig";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ActionConfigService {
  constructor(private httpClient: HttpClient) {}

  processAction(action: ActionConfig, entity: any): Observable<any> {
    if (action.formActionType.toUpperCase() === "POST") {
      return this.httpClient.post(action.actionResourceUrl, entity);
    }
    if (action.formActionType.toUpperCase() === "PUT") {
      return this.httpClient.put(action.actionResourceUrl, entity);
    }
  }
}
