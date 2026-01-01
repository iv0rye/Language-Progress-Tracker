import { Component, DestroyRef, inject } from '@angular/core';
import { Session } from '../../../models/session';
import { BehaviorSubject, EMPTY, interval, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [
    AsyncPipe
  ],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
  session: Session = new Session();

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  
  private isActive$ = new BehaviorSubject<boolean>(true);
  totalSessionTime$ = new BehaviorSubject<number>(0);

  constructor(private destroyRef: DestroyRef){
    this.isActive$.pipe(
      switchMap(active => active ? interval(1000) : EMPTY),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.totalSessionTime$.next(this.totalSessionTime$.value + 1);
      this.updateTimeFormatting();
    })
  }

  toggleSession() {
    this.isActive$.value ? this.stopSession() : this.startSession();
  }

  startSession() {
    this.session = new Session();
    this.totalSessionTime$.next(0);
    this.resetTime();
    this.isActive$.next(true);
  }

  stopSession() {
    this.isActive$.next(false);
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
