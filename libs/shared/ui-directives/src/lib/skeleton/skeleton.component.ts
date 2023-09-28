import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { primengModules } from '@ng-greenfield/shared/utils-primeng';

export type Rounding = 'none' | 'small' | 'medium' | 'large' | 'full';

export const roundingClassMap: Record<Rounding, string> = {
  none: '',
  small: 'rounded-sm',
  medium: 'rounded-md',
  large: 'rounded-lg',
  full: 'rounded-full',
};

@Component({
  selector: 'ng-greenfield-skeleton',
  standalone: true,
  imports: [CommonModule, primengModules],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  @Input({ required: true }) width!: string;
  @Input({ required: true }) height!: string;
  @Input({ required: true }) borderRadius!: string;
  @Input({ required: true }) styleClass?: string;
}
