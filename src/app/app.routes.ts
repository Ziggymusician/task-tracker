import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/board/board.component').then((m) => m.BoardComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/ticket/ticket.component').then((m) => m.TicketComponent),
  },
  //   {
  //     path: '**',
  //     component: NotFoundComponent
  //   }
];
