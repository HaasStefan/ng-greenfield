import { AsyncPipe } from '@angular/common';
import {
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  Rounding,
  SkeletonComponent,
  roundingClassMap,
} from './skeleton/skeleton.component';

export type SkeletonDirectiveContext<T> = Observable<NonNullable<T>> | T;

@Directive({
  selector: '[ngGreenfieldSkeleton]',
  standalone: true,
})
export class SkeletonDirective<TValue, TTemplateRef> implements OnChanges {
  private readonly templateRef = inject(TemplateRef<TTemplateRef>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly asyncPipe = inject(AsyncPipe);

  showSkeleton = signal(false);
  @Input({
    required: true,
  })
  public set ngGreenfieldSkeleton(context: SkeletonDirectiveContext<TValue>) {
    this.showSkeleton.set(
      context instanceof Observable
        ? this.asyncPipe.transform(context) !== null
        : context !== null
    );
  }

  @Input({ alias: 'ngGreenfieldSkeletonWidth' }) width = '100%';
  @Input({ alias: 'ngGreenfieldSkeletonHeight' }) height = '1rem';
  @Input({ alias: 'ngGreenfieldSkeletonRounding' }) rounding: Rounding =
    'small';
  @Input({ alias: 'ngGreenfieldSkeletonStyleClass' }) styleClass?: string;

  async ngOnChanges() {
    if (this.showSkeleton()) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
      const { instance } =
        this.viewContainerRef.createComponent(SkeletonComponent);

      instance.width = this.width;
      instance.height = this.height;
      instance.styleClass = this.styleClass;
      instance.borderRadius = roundingClassMap[this.rounding];
    }
  }
}
