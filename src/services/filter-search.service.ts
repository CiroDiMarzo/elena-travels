import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * This service only bridges the text in the top status bar and the datasource of the table.
 */
@Injectable({
  providedIn: 'root'
})
export class FilterSearchService {

  /**
   * The subject used to fire an event when the filter text has changed.
   */
  filterChanged: Subject<string>;

  /**
   * Initializes a new instance of the class FilterSearchService.
   */
  constructor() {
    this.filterChanged = new Subject<string>();
  }

  /**
   * Fires the filter change event.
   * @param filterText the text of the filter.
   */
  fireFilterChanged(filterText: string) {
    this.filterChanged.next(filterText);
  }
}
