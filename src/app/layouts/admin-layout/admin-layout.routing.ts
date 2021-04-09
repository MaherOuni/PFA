import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { PosComponent } from '../../pages/pos/pos.component';
import { ProductComponent } from '../../pages/product/product.component';
import { CategorieComponent } from '../../pages/categorie/categorie.component';
import { ClientComponent } from '../../pages/client/client.component';
import { ProviderComponent } from '../../pages/provider/provider.component';
import { DepositComponent } from '../../pages/deposit/deposit.component';
import { SaleComponent } from '../../pages/sale/sale.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'pos',      component: PosComponent },
    { path: 'product',      component: ProductComponent },
    { path: 'categorie',      component: CategorieComponent },
    { path: 'client',      component: ClientComponent },
    { path: 'provider',      component: ProviderComponent },
    { path: 'deposit',      component: DepositComponent },
    { path: 'sale',      component: SaleComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
