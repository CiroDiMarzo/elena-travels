import { EventEmitter } from "@angular/core";

/**
 * A custom filter for the travels mat-table
 */
// export class FilterState {
//     /**
//      * The filter text.
//      */
//     filterText: string;
// }

/**
 * The class that raises the filter change event.
 */
export class CustomFilter {

    private _filterText: string;

    /** Event emitted when the user changes either the active sort or sort direction. */
    readonly filterChange: EventEmitter<string>;

    /**
     *
     */
    constructor() {
        this.filterChange = new EventEmitter<string>();
        this._filterText = '';
    }

    /** The filter text. */
    get filterText(): string {
        return this._filterText;
    }

    set filterText(filterText: string) {
        this._filterText = filterText;
        this.filterChange.emit(this._filterText);
    }
}