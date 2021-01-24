import { Component, OnInit } from "@angular/core";
import { DataLoaderService } from "src/app/core/data-loader.service";
import { FormConfig } from "src/app/core/config/FormConfig";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap, mergeMap } from "rxjs/internal/operators";
import { FormConfigService } from "src/app/core/services/form-config.service";
import { Observable, forkJoin, BehaviorSubject } from "rxjs";
import { InputConfig } from "src/app/core/config/InputConfig";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
  public editUserFormConfigSubject = new BehaviorSubject<FormConfig>(null);

  constructor(
    private dataLoaderService: DataLoaderService,
    private activatedRoute: ActivatedRoute,
    private formConfigService: FormConfigService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        mergeMap((params: ParamMap) =>
          forkJoin(
            this.dataLoaderService.loadUserData(params.get("id")),
            this.formConfigService.getEditUserInputConfig()
          )
        )
      )
      .subscribe(data => {
        const editUserFormConfigLoaded: FormConfig = data[1];
        editUserFormConfigLoaded.inputConfigurations.map(
          (inputConfiguration: InputConfig) => {
            inputConfiguration.initialValue =
              data[0][inputConfiguration.formEntityProperty];
          }
        );
        editUserFormConfigLoaded.actionConfigurations.map(actionConfig => {
          actionConfig.actionResourceUrl = `${actionConfig.actionResourceUrl}/${data[0].id}`;
        });
        console.log(JSON.stringify(editUserFormConfigLoaded));
        console.log(JSON.stringify(data[1]));
        this.editUserFormConfigSubject.next(editUserFormConfigLoaded);
      });
  }
}
