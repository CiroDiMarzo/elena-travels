import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FilterSearchService } from 'src/services/filter-search.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {

  /**
   * The model string of the filter textbox.
   */
  filterText: string | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private filterSearchService: FilterSearchService) {
      this.filterText;
  }

  /**
   * Calls the filter service to update the datasource.
   * @param event the event object.
   */
  onFilterChanged(event: any) {
    console.log("EVENT",event);
    this.filterSearchService.fireFilterChanged(event);
  }
}
