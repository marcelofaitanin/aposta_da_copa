import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';
import { Bet, Pick } from '../models/models';

interface CreateBetResponse {
  bet: Bet;
  balance: number;
}

@Injectable({ providedIn: 'root' })
export class BetService {
  constructor(private http: HttpClient) {}

  /** Cria uma aposta em um jogo. */
  create(gameId: string, pick: Pick, amount: number): Observable<CreateBetResponse> {
    return this.http.post<CreateBetResponse>(`${API_URL}/bets`, { gameId, pick, amount });
  }

  /** Lista as apostas do usuário autenticado. */
  myBets(): Observable<Bet[]> {
    return this.http.get<Bet[]>(`${API_URL}/bets/me`);
  }
}
