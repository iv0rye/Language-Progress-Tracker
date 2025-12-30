import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-footer-only-layout',
  imports: [
    RouterOutlet,
    Footer
  ],
  templateUrl: './footer-only-layout.html',
  styleUrl: './footer-only-layout.css',
})
export class FooterOnlyLayout {

}
