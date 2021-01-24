import { NgModule } from "@angular/core";

import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { TreeFormComponent } from './tree-form/tree-form.component';


@NgModule({
  declarations: [AddUserComponent, EditUserComponent, ListUserComponent, TreeFormComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
