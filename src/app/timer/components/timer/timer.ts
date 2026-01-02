import { Component, DestroyRef, inject } from '@angular/core';
import { Session } from '../../../models/session';
import { BehaviorSubject, EMPTY, interval, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { SessionService } from '../../services/session-service';

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
  session: Session = new Session();

  // TODO: Implement all sessions get feature
  allSessions: Array<any> = []; 

  sessionOngoing: boolean = false;
  errorMessage: string = "";

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  
  private isActive$ = new BehaviorSubject<boolean>(true);
  totalSessionTime$ = new BehaviorSubject<number>(0);

  constructor(private destroyRef: DestroyRef, private sessionService: SessionService){
    this.isActive$.pipe(
      switchMap(active => active ? interval(1000) : EMPTY),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.totalSessionTime$.next(this.totalSessionTime$.value + 1);
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
    this.session = new Session();
    this.totalSessionTime$.next(0);
    this.resetTime();
    this.isActive$.next(true);
  }

  stopSession() {
    this.sessionOngoing = false;
    this.isActive$.next(false);
    this.totalSessionTime$.next(0);
    this.resetTime();

    this.sessionService.addSession(this.session).subscribe({
      next: (data: any) => {

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
