import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"]
})
export class DataTableComponent implements OnInit {
  @Input() public rows: Array<any>;
  @Input() public columns: Array<any>;
  @Input() public page: number;
  @Input() public itemsPerPage: number;
  @Input() public maxSize: number;
  @Input() public numPages: number;
  @Input() public length: number;
  @Input() public config: any;
  public data: Array<any>;
  @Input() public dataSubject: BehaviorSubject<
    Array<any>
  > = new BehaviorSubject(null);

  @Output() public cellClickedEvent = new EventEmitter<any>();

  constructor() {}

  public ngOnInit(): void {
    this.dataSubject.subscribe(data => {
      if (data) {
        this.data = data;
        this.length = this.data.length;
        this.onChangeTable(this.config);
      }
    });
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end =
      page.itemsPerPage > -1 ? start + page.itemsPerPage : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== "" && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === "desc" ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === "asc" ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(
          this.config.filtering.filterString
        )
      );
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (
          item[column.name].toString().match(this.config.filtering.filterString)
        ) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(
    config: any,
    page: any = { page: this.page, itemsPerPage: this.itemsPerPage }
  ): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows =
      page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    this.cellClickedEvent.emit(data);
  }
}
