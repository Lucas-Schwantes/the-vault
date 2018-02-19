import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoolStuffPage } from './cool-stuff';

@NgModule({
  declarations: [
    CoolStuffPage,
  ],
  imports: [
    IonicPageModule.forChild(CoolStuffPage),
  ],
})
export class CoolStuffPageModule {}
