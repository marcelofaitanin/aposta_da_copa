import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { BetService } from '../../core/services/bet.service';
import { AuthService } from '../../core/services/auth.service';
import { Game, Pick } from '../../core/models/models';

@Component({
  selector: 'app-games',
  imports: [CommonModule, FormsModule],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class Games implements OnInit {
  private gameService = inject(GameService);
  private betService = inject(BetService);
  protected auth = inject(AuthService);
  private router = inject(Router);

  games = signal<Game[]>([]);
  loading = signal(true);
  feedback = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  // Estado do "ticket" de aposta selecionado
  selectedGame = signal<Game | null>(null);
  selectedPick = signal<Pick | null>(null);
  amount = signal<number>(50);

  potentialReturn = computed(() => {
    const g = this.selectedGame();
    const p = this.selectedPick();
    if (!g || !p) return 0;
    return Math.round(this.amount() * g.odds[p] * 100) / 100;
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.gameService.list().subscribe({
      next: (games) => {
        this.games.set(games);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  /** Abre o ticket de aposta para um jogo/palpite. */
  choose(game: Game, pick: Pick): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.feedback.set(null);
    this.selectedGame.set(game);
    this.selectedPick.set(pick);
  }

  closeTicket(): void {
    this.selectedGame.set(null);
    this.selectedPick.set(null);
  }

  confirmBet(): void {
    const g = this.selectedGame();
    const p = this.selectedPick();
    if (!g || !p) return;

    this.betService.create(g._id, p, this.amount()).subscribe({
      next: (res) => {
        this.auth.updateBalance(res.balance);
        this.feedback.set({
          type: 'success',
          text: `Aposta de R$ ${this.amount()} em "${this.pickLabel(g, p)}" registrada!`,
        });
        this.closeTicket();
      },
      error: (err) => {
        this.feedback.set({
          type: 'error',
          text: err?.error?.message || 'Erro ao registrar aposta.',
        });
      },
    });
  }

  pickLabel(game: Game, pick: Pick): string {
    if (pick === 'home') return game.homeTeam;
    if (pick === 'away') return game.awayTeam;
    return 'Empate';
  }

  isOpen(game: Game): boolean {
    return game.status === 'agendado' && new Date(game.matchDate) > new Date();
  }
}
