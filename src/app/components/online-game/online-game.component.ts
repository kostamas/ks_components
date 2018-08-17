import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackgammonDBToken} from '../backgammon/backgammonDb.types';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-online-game',
  templateUrl: './online-game.component.html',
  styleUrls: ['./online-game.component.scss']
})
export class OnlineGameComponent implements OnInit {

  public localUser;
  public onlinePlayers$;
  public selectedPlayer;
  public openedGames;

  constructor(private router: Router, @Inject(BackgammonDBToken) private backgammonDBService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.backgammonDBService.getUser()
        .catch(error => {
          this.router.navigate([`/login`]);
          return error;
        })
        .subscribe(currentUser => this.initMenu(currentUser));
    });
  }

  private initMenu = (currentUser) => {
    this.onlinePlayers$ = this.backgammonDBService.getAllUsers(currentUser)
      .do((players: any) => {
        if (this.selectedPlayer) {
          const updatedSelectedPlayer = players.filter(player => player.name === this.selectedPlayer.name)[0];
          if (updatedSelectedPlayer) {
            this.selectedPlayer = updatedSelectedPlayer;
          } else {
            this.selectedPlayer = players[0];
          }
        } else {
          this.selectedPlayer = players[0];
        }
        if (this.localUser.gameIds) {

          this.openedGames = [];
          Object.keys(this.localUser.gameIds).forEach(gameId => {
            const secondPlayer = players.filter(player => player.gameIds && player.gameIds[gameId])[0];
            if (secondPlayer) {
              this.openedGames.push({gameId, secondPlayer: secondPlayer});
            }
          });
        }
      });
  };

  public sendInvitation() {
    this.backgammonDBService.sendInvitation(this.localUser, this.selectedPlayer);
  }

  public acceptInvitation(secondPlayerName) {
    this.backgammonDBService.createNewGame(this.localUser.name, secondPlayerName)
      .subscribe(gameId => {
        this.router.navigate(['/backgammon/', {gameId}]);
      });
  }

  public continue(playerName) {
    const openedGame = this.openedGames.filter((_openedGame: any) => _openedGame.secondPlayer.name === playerName)[0];
    this.router.navigate(['/backgammon/', {gameId: openedGame.gameId}]);
  }

  public checkIfCanInvite(selectedPlayer) {
    return !this.checkIfOpenGameExists(selectedPlayer) &&
      (!selectedPlayer || !selectedPlayer.invitations || (
        this.localUser &&
        (!selectedPlayer.invitations.sent || !selectedPlayer.invitations.sent[this.localUser.name]) &&
        (!selectedPlayer.invitations.received || !selectedPlayer.invitations.received[this.localUser.name])
      ));
  }

  public checkIfOpenGameExists(selectedPlayer) {
    if (!this.localUser || !this.localUser.gameIds || !selectedPlayer || !selectedPlayer.gameIds) {
      return false;
    }

    return Object.keys(this.localUser.gameIds)
      .filter(gameId => !!selectedPlayer.gameIds[gameId])
      .length > 0;
  }
}
