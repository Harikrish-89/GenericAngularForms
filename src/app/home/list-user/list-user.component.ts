import { mapTo, map } from "rxjs/internal/operators";
import { Component, OnInit } from "@angular/core";
import { DataLoaderService } from "src/app/core/data-loader.service";
import { BehaviorSubject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.scss"]
})
export class ListUserComponent implements OnInit {
  public userRows: Array<any> = [];

  public userColumns: Array<any> = [
    {
      title: "User id",
      name: "id",
      filtering: { filterString: "", placeholder: "Filter by user id" }
    },

    {
      title: "First Name",
      name: "firstname",
      filtering: { filterString: "", placeholder: "Filter by first name" }
    },
    {
      title: "Middle Name",
      name: "middlename",
      sort: false,
      filtering: { filterString: "", placeholder: "Filter by middleName" }
    },
    {
      title: "Last Name",
      name: "lastname",
      filtering: { filterString: "", placeholder: "Filter by last name" }
    },
    {
      title: "Department",
      className: ["office-header", "text-success"],
      name: "dept",
      sort: "asc"
    },
    {
      title: "Gender",
      name: "gender",
      sort: "",
      filtering: { filterString: "", placeholder: "Filter by gender." }
    },
    { title: "Status", name: "activeflag" },
    { title: "Send email", name: "sendemail" }
  ];

  public userPage = 1;

  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.userColumns },
    filtering: { filterString: "" },
    className: ["table-striped", "table-bordered"]
  };

  public userDataSubject: BehaviorSubject<Array<any>> = new BehaviorSubject<
    Array<any>
  >(null);

  constructor(
    private dataLoaderService: DataLoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataLoaderService
      .loadUsersData()
      .subscribe(
        data => {
          this.userDataSubject.next(data);
        },
        error => {
          console.log("error:Listing data" + error);
        }
      );
  }
  public onCellClick(data: any) {
    console.log("eventClick=>"+ JSON.stringify(data));
    this.router.navigate([`editUser/${data.row.id}`], {
      relativeTo: this.activatedRoute
    });
  }
}
