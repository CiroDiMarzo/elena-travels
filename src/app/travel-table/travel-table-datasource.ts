import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of } from 'rxjs';
import { CustomFilter } from './custom-filter/custom-filter';
import { TravelTableItem } from 'src/models/travel-table-item.model';
import { TravelService } from 'src/services/travel.service';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TravelTableItem[] = [
  {id: 1, startLocation: 'Meride', endLocation: 'Tremona', distance: 2},
  {id: 2, startLocation: 'Arzo', endLocation: 'Besazio', distance: 1.1},
  {id: 3, startLocation: 'Rancate', endLocation: 'Ligornetto', distance: 1.8},
  {id: 4, startLocation: 'Stabio', endLocation: 'Genestrerio', distance: 2.8},
  {id: 5, startLocation: 'Genestrerio', endLocation: 'Rancate', distance: 3},
  {id: 6, startLocation: 'Ligornetto', endLocation: 'Arzo', distance: 4.7},
  {id: 7, startLocation: 'Besazio', endLocation: 'Meride', distance: 3.2},
  {id: 8, startLocation: 'Mendrisio', endLocation: 'Coldrerio', distance: 2.4},
  {id: 9, startLocation: 'Balerna', endLocation: 'chiasso', distance: 3},
  {id: 10, startLocation: 'Sagno', endLocation: 'Vacallo', distance: 5.6},
  {id: 11, startLocation: 'Novazzano', endLocation: 'Pedrinate', distance: 3.7},
  {id: 12, startLocation: 'Pedrinate', endLocation: 'Sagno', distance: 8.8},
  {id: 13, startLocation: 'Vacallo', endLocation: 'Balerna', distance: 3.6},
  {id: 14, startLocation: 'Chiasso', endLocation: 'Mendrisio', distance: 9.6}
];

/**
 * Data source for the TravelTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TravelTableDataSource extends DataSource<TravelTableItem> {
  data: TravelTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: CustomFilter;

  constructor(private travelService: TravelService) {
    super();

    this.filter = new CustomFilter();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TravelTableItem[]> {
    if (this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.travelService.data), this.filter.filterChange, this.sort.sortChange)
        .pipe(map((test) => {
          return this.getSortedData(this.getFilteredData([...this.travelService.data ]));
        }));

    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Filters the data at client-side.
   * @param data the data to be filtered.
   */
  private getFilteredData(data: TravelTableItem[]): TravelTableItem[] {
    if (this.filter) {
      return data.filter(item => item.startLocation.toLowerCase().indexOf(this.filter.filterText.toLowerCase()) > -1 || 
                                  item.endLocation.toLowerCase().indexOf(this.filter.filterText.toLowerCase()) > -1);
    }
    return data;
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TravelTableItem[]): TravelTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'startLocation': return compare(a.startLocation.toLowerCase(), b.startLocation.toLowerCase(), isAsc);
        case 'endLocation': return compare(a.endLocation.toLowerCase(), b.endLocation.toLowerCase(), isAsc);
        case 'distance': return compare(+a.distance, +b.distance, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TravelTableItem[]): TravelTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
