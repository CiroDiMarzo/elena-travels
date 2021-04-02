import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TravelTableItem } from 'src/models/travel-table-item.model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  // TODO: replace this with real data from your application
  data: TravelTableItem[] = [
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

  constructor() { }

  get(): Observable<TravelTableItem[]> {
    return of(this.data);
  }

  add(item: TravelTableItem): Observable<TravelTableItem> {
    this.data.push(item);

    return of(item);
  }

  update(item: TravelTableItem): Observable<TravelTableItem> {
    let storedItem = this.data.find(i => i.id == item.id);

    if (storedItem) {
      storedItem.distance = item.distance;
      storedItem.endLocation = item.endLocation;
      storedItem.startLocation = item.startLocation;
    
      return of(storedItem);
    }

    return of(item);
  }

  remove(item: TravelTableItem): Observable<TravelTableItem> {

    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      
      if (element.id == item.id) {
        this.data.splice(index, 1);

        break;
      }
    }

    return of(item);
  }
}
