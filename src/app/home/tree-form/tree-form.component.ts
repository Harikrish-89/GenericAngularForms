import { Component, OnInit } from "@angular/core";
import { FormConfigService } from "src/app/core/services/form-config.service";
import { FormConfig } from "src/app/core/config/FormConfig";

@Component({
  selector: "app-tree-form",
  templateUrl: "./tree-form.component.html",
  styleUrls: ["./tree-form.component.scss"]
})
export class TreeFormComponent implements OnInit {
  public treeConfig: FormConfig;

  constructor(private formConfigService: FormConfigService) {}

  ngOnInit() {
    this.formConfigService
      .getTreeInputConfig()
      .subscribe(data => (this.treeConfig = data));
  }
}
