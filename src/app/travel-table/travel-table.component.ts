import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TravelTableItem } from 'src/models/travel-table-item.model';
import { FilterSearchService } from 'src/services/filter-search.service';
import { TravelService } from 'src/services/travel.service';
import { TravelTableDataSource } from './travel-table-datasource';

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

  constructor(private filterService: FilterSearchService,
      private travelService: TravelService) {
    this.dataSource = new TravelTableDataSource(this.travelService);
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
