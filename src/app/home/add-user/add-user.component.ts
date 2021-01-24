import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormConfigService } from "src/app/core/services/form-config.service";
import { FormConfig } from "src/app/core/config/FormConfig";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit, OnDestroy {
  public addUserFormConfig: FormConfig;

  private formConfigSubscription: Subscription;

  constructor(private formConfigService: FormConfigService) {}

  ngOnInit() {
    this.formConfigSubscription = this.formConfigService
      .getInputConfig()
      .subscribe(data => {
        this.addUserFormConfig = data;
      });
  }

  ngOnDestroy() {
    if (this.formConfigSubscription) {
      this.formConfigSubscription.unsubscribe();
    }
  }
}
