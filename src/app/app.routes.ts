import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./board/board.component').then((m) => m.BoardComponent),
  },
  //   {
  //     path: '*',
  //     component: NotFoundComponent
  //   }
];
