import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/CPR',
    pathMatch: 'full'
  },
  {
    path: 'folder/history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'folder/statistics',
    loadChildren: () => import('./stats/graph-creation/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./start-cpr/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'edit-event',
    loadChildren: () => import('./history/edit-event/edit-event.module').then( m => m.EditEventPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
