import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetService } from '../../core/services/bet.service';
import { Bet } from '../../core/models/models';

@Component({
  selector: 'app-my-bets',
  imports: [CommonModule],
  templateUrl: './my-bets.html',
  styleUrl: './my-bets.css',
})
export class MyBets implements OnInit {
  private betService = inject(BetService);

  bets = signal<Bet[]>([]);
  loading = signal(true);

  totalApostado = computed(() => this.bets().reduce((s, b) => s + b.amount, 0));
  totalGanho = computed(() =>
    this.bets().filter((b) => b.status === 'ganha').reduce((s, b) => s + b.payout, 0)
  );

  ngOnInit(): void {
    this.betService.myBets().subscribe({
      next: (bets) => {
        this.bets.set(bets);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  pickLabel(bet: Bet): string {
    if (bet.pick === 'home') return bet.game.homeTeam;
    if (bet.pick === 'away') return bet.game.awayTeam;
    return 'Empate';
  }
}
