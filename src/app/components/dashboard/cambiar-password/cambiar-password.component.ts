import { Component , OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangePassword } from 'src/app/models/ChangePassword';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPassword: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, { validator: this.checkPassword })
  }

  ngOnInit(): void {
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls["nuevaPassword"].value;//passwordAnterior
    const confirmPass = group.controls["confirmPassword"].value;

    return pass === confirmPass ? null : { notSame: true};
  }

  guardarPassword(): void {
    const changePassword: ChangePassword = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword
    };

    console.log(this.cambiarPassword);
    debugger;

    this.loading = true;
    this.usuarioService.changePassword(changePassword).subscribe(data => {
      this.toastr.info(data.message);
      this.router.navigate(['/dashboard']);
    }, error => {
      debugger;
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message, 'Error!');
    });


  }

}
