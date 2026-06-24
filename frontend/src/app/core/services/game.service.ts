import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';
import { Game } from '../models/models';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private http: HttpClient) {}

  /** Lista todos os jogos (opcionalmente filtrando por status). */
  list(status?: 'agendado' | 'encerrado'): Observable<Game[]> {
    const query = status ? `?status=${status}` : '';
    return this.http.get<Game[]>(`${API_URL}/games${query}`);
  }

  get(id: string): Observable<Game> {
    return this.http.get<Game>(`${API_URL}/games/${id}`);
  }

  /** (Admin) Registra o placar e encerra o jogo, liquidando as apostas. */
  settle(id: string, homeScore: number, awayScore: number): Observable<any> {
    return this.http.post(`${API_URL}/games/${id}/result`, { homeScore, awayScore });
  }
}
