import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  error = signal('');
  loading = signal(false);

  submit(): void {
    this.error.set('');
    this.loading.set(true);
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/jogos']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Não foi possível criar a conta.');
      },
    });
  }
}
