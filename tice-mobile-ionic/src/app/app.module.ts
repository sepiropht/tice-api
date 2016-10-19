import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SearchPage } from '../pages/search/search';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {StationCode} from '../service/stationCode';
import {StationDetail} from '../pages/station-detail/station-detail';
import {ExtractFromHtml} from '../providers/extract-from-html';
@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    StationDetail
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    StationDetail
  ],
  providers: [StationCode, ExtractFromHtml]
})
export class AppModule {}
