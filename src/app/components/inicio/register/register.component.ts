import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  loading = false;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router,
               private toastr: ToastrService ) {

  const usuarioControl = new FormControl('', [Validators.required]);
  const passControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  this.register = this.fb.group({      
    // usuario: usuarioControl,
    // password: passControl,
    usuario: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['']    
  },{ validator: this.checkPassword }  );
}

ngOnInit(): void {  }

registrarUsuario(): void{
  console.log(this.register); // const valorNombre = this.register.get('usuario')?.value; console.log("El valor del nombre es "+valorNombre);
  const usuario: Usuario ={
         nombreUsuario: this.register.value.usuario,
         password: this.register.value.password    };  
  this.loading = true;         
       
  this.usuarioService.saveUser(usuario).subscribe(data => {
  debugger
  console.log(data);
  this.toastr.success('El usuario ' + usuario.nombreUsuario + ' fue registrado con exito!', 'Usuario Registrado!');
  this.router.navigate(['/inicio/login']);
  this.loading = false;
}, error => {
  debugger
  this.loading = false;
  console.log(error);
  this.toastr.error(error.error.message, 'Error!'); //Esto estaba antes
  //this.toastr.error(error.error, 'Error!');
  this.register.reset();
  });  
}

checkPassword(group: FormGroup): any {
  const pass = group.controls['password'].value;
  const confirmPass = group.controls['confirmPassword'].value;
  
  console.log(pass+ " ** "+confirmPass);
  return pass === confirmPass ? null : { notSame: true};
}
}
