import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { DataItem } from '../data-item';
import { DataItemService } from '../data-item.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

// We use the gql tag to parse our query string into a query document
const FeedData = gql`
  {
    randomPlayer {
      name
     }
  }
`;

@Component({
  selector: 'app-feed',
  providers: [DataItemService],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  loading: boolean;

  private _dataItems: ObservableArray<DataItem>;
  private querySubscription: Subscription;

  constructor(private _dataItemService: DataItemService, private apollo: Apollo, private _http: HttpClient) {
    // console.log(this._dataItemService.getDataItems());
  }

  get dataItems(): ObservableArray<DataItem> {
      return this._dataItems;
  }

  ngOnInit() {
      // this._dataItems = new ObservableArray(this._dataItemService.getDataItems());
      // console.log(this._dataItems);
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  getDataHttp() {
    console.log('BUTTON 2 taped');

    const uri = environment.apiUri;
    console.log('api uri is: ' + environment.apiUri);
    this._http.get(uri).subscribe((data: any) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  getData() {
    console.log('BUTTON taped');

    this.querySubscription = this.apollo.watchQuery<any>({
      query: FeedData
    }).valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this._dataItems = data;
        console.log(this._dataItems);
      }, error => {
        console.log(error);
      });
  }

}
