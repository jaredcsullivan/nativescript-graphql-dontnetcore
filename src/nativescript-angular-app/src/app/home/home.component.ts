import { Component } from '@angular/core';
import { alert } from 'tns-core-modules/ui/dialogs';
import { SelectedIndexChangedEventData } from 'tns-core-modules/ui/tab-view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'my-native-app';

  constructor() {
  }



}
