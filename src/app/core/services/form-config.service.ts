import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormConfig } from "../config/FormConfig";

@Injectable({
  providedIn: "root"
})
export class FormConfigService {
  constructor(private httpClient: HttpClient) {}

  public getInputConfig(): Observable<FormConfig> {
    let inputConfigObservable: Observable<FormConfig>;
    if (environment.inputConfigUrl) {
      inputConfigObservable = this.httpClient.get<FormConfig>(
        environment.inputConfigUrl
      );
    } else {
      inputConfigObservable = of(require("../config/AddUserFormConfig.json"));
    }
    return inputConfigObservable;
  }

  public getEditUserInputConfig(): Observable<FormConfig> {
    let inputConfigObservable: Observable<FormConfig>;
    if (environment.inputConfigUrl) {
      inputConfigObservable = this.httpClient.get<FormConfig>(
        environment.inputConfigUrl
      );
    } else {
      inputConfigObservable = of(require("../config/EditUserFormConfig.json"));
    }
    return inputConfigObservable;
  }

  public getTreeInputConfig(): Observable<FormConfig> {
    return of(require("../config/TreeFormConfig.json"));
  }
}
