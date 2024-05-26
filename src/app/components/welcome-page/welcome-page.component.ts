import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  selector: 'hs-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {
  readonly major = VERSION.major;
}
