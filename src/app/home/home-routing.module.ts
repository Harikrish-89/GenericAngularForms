import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { TreeFormComponent } from "./tree-form/tree-form.component";

const routes: Routes = [
  { path: "", component: ListUserComponent },
  { path: "addUser", component: AddUserComponent },
  { path: "editUser/:id", component: EditUserComponent },
  { path: "treeForm", component: TreeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
