import { Component } from '@angular/core';

import { ItemsPage } from '../items/items';
import { CoolStuffPage } from '../cool-stuff/cool-stuff';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ItemsPage;
  tab2Root = CoolStuffPage;
  tab3Root = HomePage;

  constructor() {

  }
}
