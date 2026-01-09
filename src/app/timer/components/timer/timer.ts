import { Component, DestroyRef, inject } from '@angular/core';
import { Session } from '../../../models/session';
import { BehaviorSubject, EMPTY, interval, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { SessionService } from '../../services/session-service';
import { AuthService } from '../../../auth/services/auth-service';

@Component({
  selector: 'app-timer',
  imports: [
    AsyncPipe,
    ButtonModule
],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
  // TODO: Implement all sessions get feature
  allSessions: Array<any> = []; 

  category: string = "";

  sessionOngoing: boolean = false;
  errorMessage: string = "";

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  
  private isActive$ = new BehaviorSubject<boolean>(true);
  totalSessionTime$ = new BehaviorSubject<number>(0);

  constructor(private destroyRef: DestroyRef, private sessionService: SessionService){
    this.isActive$.pipe(
      // if timer is active, sets interval to 1 second, otherwise sets to empty observable
      switchMap(active => active ? interval(1000) : EMPTY),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      // increments total session time
      this.totalSessionTime$.next(this.totalSessionTime$.value + 1);
      // updates time formatting
      this.updateTimeFormatting();
    })
  }

  toggleSession() {
    this.sessionOngoing ? this.stopSession() : this.startSession();
  }

  pauseSession() {
    this.isActive$.next(false);
  }

  resumeSession() {
    this.isActive$.next(true);
  }

  startSession() {
    this.sessionOngoing = true;
    this.totalSessionTime$.next(0);
    this.resetTime();
    this.isActive$.next(true);
  }

  stopSession() {
    this.sessionOngoing = false;
    this.isActive$.next(false);

    const session = new Session();

    session.totalTime = this.totalSessionTime$.value;
    session.category = this.category;

    this.sessionService.addSession(session).subscribe({
      next: (data: any) => {
        this.totalSessionTime$.next(0);
        this.resetTime();
      },
      error: (err: any) => {
        this.errorMessage = err;
      }
    })
  }

  // TEMP!! this is a temporary solution for displaying the time in a human way! i plan to use a pipe or something of the sort :)
  updateTimeFormatting(){
    this.seconds++;

    if (this.seconds > 59){
      this.seconds = 0;
      this.minutes++;
    }

    if (this.minutes > 59){
      this.minutes = 0;
      this.hours++;
    }
  }

  // This is also TEMP!
  resetTime(){
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }
}
