import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}
  userCred: any ={}
  guestEmail = "";

  constructor(private accountService: AccountService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
  }

  Register() {
    
    if(this.model.password == this.model.confirmPassword && (this.model.checkTerms)){
      this.userCred.username = this.model.username;
      this.userCred.password = this.model.password;
      
      this.accountService.Register(this.userCred).subscribe(response => {
        this.route.navigateByUrl('/');
      })
    }
    
  }

  AddGuestMember() {
    if(this.guestEmail != "") {
      if(localStorage.getItem('guestUser')) localStorage.removeItem('guestUser');
      localStorage.setItem('guestUser', this.guestEmail);
      this.route.navigateByUrl('checkout');
    } else {
      this.toastr.warning("You must enter your email address to proceed");
    }
  }

}
