import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'hs-welcome-page',
  imports: [MatCardModule],
  templateUrl: './welcome-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {
  readonly major = VERSION.major;
}
