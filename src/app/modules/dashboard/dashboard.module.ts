import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GroupsComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'groups',
            component: GroupsComponent
          },
          {
            path: 'friends',
            component: FriendsComponent
          }
        ]
      }
    ])
  ]
})
export class DashboardModule { }
