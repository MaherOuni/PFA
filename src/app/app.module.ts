import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { PosComponent } from './pages/pos/pos.component';
import { ProductComponent } from './pages/product/product.component';
import { CategorieComponent } from './pages/categorie/categorie.component';
import { ClientComponent } from './pages/client/client.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { SaleComponent } from './pages/sale/sale.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule} from '@angular/forms';
import { LottieAnimationViewModule } from 'ng-lottie';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { StuffComponent } from './pages/stuff/stuff.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    LottieAnimationViewModule.forRoot(),
    NgxCsvParserModule,

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PosComponent,
    ProductComponent,
    CategorieComponent,
    ClientComponent,
    ProviderComponent,
    DepositComponent,
    SaleComponent,
    StuffComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
