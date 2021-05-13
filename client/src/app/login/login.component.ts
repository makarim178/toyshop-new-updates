import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any ={}

  constructor(public accountService: AccountService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  Login() {
    this.accountService.Login(this.model).subscribe(response => {
      //console.log('You are logged in!');
      this.toastr.success('You have successfully logged in');
      this.route.navigateByUrl('/');
    });
  }

}
