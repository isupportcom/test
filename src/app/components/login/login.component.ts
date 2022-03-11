import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { AuthService, ResponseData } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  error: string;
  data: any;

  login(form: NgForm){
    if(!form.valid){
      return;
    }
    const afm = form.value.username;
    const code = form.value.password;
    this.auth.apicall().subscribe(
      resData => {
       this.data = resData;
       this.auth.api2call(this.data.clientID).subscribe(
         resData =>{
           this.data = resData;
           this.auth.api3call(this.data.clientID, afm, code).subscribe(
             resData =>{
               this.data = resData;
               this.data.rows[0].NAME.toString();
               this.auth.setcustomer(this.data.rows[0]);
               this.auth.setAuthanticate(true);
               this.router.navigate(['conf'])
             }
           )
         }
       )
      },
      errorMessage => {
        console.log(errorMessage);
        this.auth.setAuthanticate(false);
        this.error = errorMessage;
      }
    )
    form.reset();
  }

  _customers: Customer[];
  
  get customers() {
    this.auth.getcustomers()
      .subscribe(customers => this._customers = customers);
    return this._customers;
  }

   guest(){
    this.auth.login('guest@guest.gr', '1234567890').subscribe(resData =>{
      this.auth.setAuthanticate(true);
      this.auth.setcustomer(resData.email);
      this.router.navigate(['']);
    })
    
    
  }


}
