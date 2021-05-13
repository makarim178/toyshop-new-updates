import { Component, OnInit } from '@angular/core';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/__ivy_ngcc__/modal';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>;
  //bsModalRef: BsModalRef;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }
 
  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    })
  }

  openRolesModal() {

    // const initialState = {
    //   list: [
    //     'Open a modal with component',
    //     'Pass your data',
    //     'Do something else',
    //     '...'
    //   ],
    //   title: 'Modal with component'
    // };
    // this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    // this.bsModalRef.content.closeBtnName = 'Close';
  

  }

}
