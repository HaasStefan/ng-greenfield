import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkeletonDirective } from '@ng-greenfield/shared/ui-directives';
import { delay, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [SkeletonDirective, CommonModule, RouterModule],
  selector: 'ng-greenfield-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  obs$ = of("hello").pipe(delay(2000));
}
