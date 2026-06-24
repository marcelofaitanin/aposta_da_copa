import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/jogos']);
  }
}
