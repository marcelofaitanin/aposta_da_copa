import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../core/services/game.service';
import { Game } from '../../core/models/models';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  private gameService = inject(GameService);

  games = signal<Game[]>([]);
  loading = signal(true);
  feedback = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  // Placares digitados, indexados por id do jogo
  scores: Record<string, { home: number | null; away: number | null }> = {};

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.gameService.list().subscribe({
      next: (games) => {
        this.games.set(games);
        games.forEach((g) => (this.scores[g._id] = { home: null, away: null }));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  settle(game: Game): void {
    const s = this.scores[game._id];
    if (s.home == null || s.away == null) {
      this.feedback.set({ type: 'error', text: 'Informe o placar completo.' });
      return;
    }
    this.gameService.settle(game._id, s.home, s.away).subscribe({
      next: (res) => {
        this.feedback.set({
          type: 'success',
          text: `Jogo encerrado. ${res.apostasLiquidadas} aposta(s) liquidada(s).`,
        });
        this.load();
      },
      error: (err) => {
        this.feedback.set({
          type: 'error',
          text: err?.error?.message || 'Erro ao encerrar o jogo.',
        });
      },
    });
  }
}
