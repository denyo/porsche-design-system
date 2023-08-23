/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-divider',
  styles: [
    `
      .divider-vertical-container-example {
        display: flex;
        height: 100px;
      }
    
      @media (min-width: 480px) and (max-width: 759px), (min-width: 1000px) and (max-width: 1299px), (min-width: 1760px) {
        .divider-vertical-responsive-container-example {
          display: flex;
          height: 100px;
        }
      }
    `,
  ],
  template: `
    <div class="playground light" title="should show a divider">
      <p-divider></p-divider>
    </div>

    <div class="playground light" title="should show divider with orientation=vertical">
      <div class="divider-vertical-container-example">
        <p-divider [orientation]="'vertical'"></p-divider>
      </div>
    </div>
    <div class="playground light" title="should show divider with direction=vertical">
      <div class="divider-vertical-container-example">
        <p-divider [direction]="'vertical'"></p-divider>
      </div>
    </div>

    <div class="playground light" title="should show responsive divider with orientation">
      <div class="divider-vertical-responsive-container-example">
        <p-divider
          [orientation]="{ base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' }"
        ></p-divider>
      </div>
    </div>
    <div class="playground light" title="should show responsive divider with direction">
      <div class="divider-vertical-responsive-container-example">
        <p-divider
          [direction]="{ base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' }"
        ></p-divider>
      </div>
    </div>

    <div class="playground light" title="should show different colors of divider">
      <p-divider></p-divider>
      <br />
      <p-divider [color]="'contrast-medium'"></p-divider>
      <br />
      <p-divider [color]="'contrast-high'"></p-divider>
      <br />
      <p-divider [color]="'neutral-contrast-low'"></p-divider>
      <br />
      <p-divider [color]="'neutral-contrast-medium'"></p-divider>
      <br />
      <p-divider [color]="'neutral-contrast-high'"></p-divider>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {}
