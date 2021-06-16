import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { FriendsComponent } from './friends/friends.component';
import { AddGroupsComponent } from './add-groups/add-groups.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GroupsComponent,
    FriendsComponent,
    AddGroupsComponent
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
            path: 'add-groups',
            component: AddGroupsComponent
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
