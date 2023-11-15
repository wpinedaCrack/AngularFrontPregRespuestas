import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
 import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  login: FormGroup;

  constructor(private fb: FormBuilder, 
              private toastr: ToastrService,
              private router: Router,  
              private loginService: LoginService
              ) {
    this.login = this.fb.group({     
      usuario: ['', Validators.required],
      password: ['', Validators.required]      
    });
  }

  ngOnInit(): void {  }
  
  log(): void{   //console.log(this.login);
    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    }
    debugger;
    this.loading = true;


    this.loginService.login(usuario).subscribe(data => {
      debugger;
      console.log(data);
      this.loading = false;
      this.loginService.setLocalStorage(data.token); // nombreUsuario      
      //this.loginService.setLocalStorage(data.token);//data.usuario
      this.router.navigate(['/dashboard']);
    }, error => {
      debugger;
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error.message, 'Error!'); 
      this.login.reset();
    });
    // setTimeout(() => {
    //   if (usuario.nombreUsuario === 'camilo' && usuario.password === '12345'){
    //     this.login.reset();
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     this.toastr.error('Usuario o contraseña incorrecto', 'Error');
    //     this.login.reset();
    //   }
    //   this.loading = false;
    // } , 3000);
  }
  
  /*setTimeout(() => {
      if (usuario.nombreUsuario === 'admin' && usuario.password === 'admin123'){
        this.login.reset();
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error('Usuario o contraseña incorrecto', 'Error');
        this.login.reset();
      }
      this.loading = false;
    } , 3000);*/


   
    // console.log(usuario);
  

}
