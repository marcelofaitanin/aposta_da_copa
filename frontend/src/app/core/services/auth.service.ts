import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../api.config';
import { AuthResponse, User } from '../models/models';

const TOKEN_KEY = 'copa_token';
const USER_KEY = 'copa_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Estado reativo do usuário logado (Signals)
  private readonly _user = signal<User | null>(this.loadUser());
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly isAdmin = computed(() => this._user()?.role === 'admin');

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_URL}/auth/login`, { email, password })
      .pipe(tap((res) => this.persist(res)));
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_URL}/auth/register`, { name, email, password })
      .pipe(tap((res) => this.persist(res)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /** Atualiza o saldo do usuário em memória (após uma aposta, por exemplo). */
  updateBalance(balance: number): void {
    const u = this._user();
    if (u) {
      const updated = { ...u, balance };
      this._user.set(updated);
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
    }
  }

  private persist(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this._user.set(res.user);
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }
}
