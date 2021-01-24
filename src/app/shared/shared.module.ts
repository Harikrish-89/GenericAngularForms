import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextInputComponent } from "./text-input/text-input.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TextAreaInputComponent } from "./text-area-input/text-area-input.component";
import { CheckBoxComponent } from "./check-box/check-box.component";
import { SelectComponent } from "./select/select.component";
import { RadioComponent } from "./radio/radio.component";
import { GenericFormComponent } from "./generic-form/generic-form.component";
import { MyTreeComponent } from "./my-tree/my-tree.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { Ng2TableModule } from "ngx-datatable/ng2-table";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@NgModule({
  declarations: [
    TextInputComponent,
    TextAreaInputComponent,
    CheckBoxComponent,
    SelectComponent,
    RadioComponent,
    GenericFormComponent,
    MyTreeComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  exports: [
    TextInputComponent,
    TextAreaInputComponent,
    CheckBoxComponent,
    SelectComponent,
    RadioComponent,
    GenericFormComponent,
    MyTreeComponent,
    DataTableComponent
  ]
})
export class SharedModule {}
