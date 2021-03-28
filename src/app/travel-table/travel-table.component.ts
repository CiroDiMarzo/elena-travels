import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FilterSearchService } from 'src/services/filter-search.service';
import { TravelTableDataSource, TravelTableItem } from './travel-table-datasource';

@Component({
  selector: 'app-travel-table',
  templateUrl: './travel-table.component.html',
  styleUrls: ['./travel-table.component.scss']
})
export class TravelTableComponent implements AfterViewInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TravelTableItem>;
  dataSource: TravelTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['startLocation', 'endLocation', 'distance'];

  constructor(private filterService: FilterSearchService) {
    this.dataSource = new TravelTableDataSource();
    this.filterService.filterChanged.subscribe(filterText => {
      this.dataSource.filter.filterText = filterText;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
