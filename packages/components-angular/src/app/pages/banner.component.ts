/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-banner',
  styles: [
    `
      p-content-wrapper > p {
        margin: 0;
        padding: 4px 2vw;
        text-align: center;
        color: white;
        background-color: lightskyblue;
      }
    
      div:not(.visualize-grid) {
        margin: 16px 0;
      }
    
      .playground {
        padding: 0;
      }
    
      .content-wrapper {
        padding: 300px 0;
      }
    
      .playground p-banner {
        --p-banner-position-type: static;
      }
    `,
  ],
  template: `
    <div class="visualize-grid">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div title="should show banner position fixed">
      <p-banner>
        <span slot="title">Slotted title</span>
        <span slot="description">Slotted description</span>
      </p-banner>
    </div>

    <div class="content-wrapper">
      <div class="playground light" title="should show banner with heading and description on light background">
        <p-banner [heading]="'Heading (--p-banner-position-type: static)'" [description]="'Description'"></p-banner>
      </div>

      <div
        class="playground light"
        title="should show banner with slotted heading and prop description on light background"
      >
        <p-banner [description]="'Description'">
          <span slot="heading">Slotted heading (--p-banner-position-type: static)</span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner with slotted heading and description on light background">
        <p-banner>
          <span slot="heading">Slotted heading (--p-banner-position-type: static)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
              <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner on light background">
        <p-banner>
          <span slot="title">Slotted title (--p-banner-position-type: static)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
              <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner with state neutral on light background">
        <p-banner [state]="'neutral'">
          <span slot="title">Slotted Title (state=neutral --p-banner-position-type: static)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
              <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner on dark background">
        <p-banner [theme]="'dark'">
          <span slot="title">Slotted Title (--p-banner-position-type: static)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
              <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner with state neutral on dark background">
        <p-banner [state]="'neutral'" [theme]="'dark'">
          <span slot="title">Slotted Title (state=neutral --p-banner-position-type: static)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
              <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner warning on light background">
        <p-banner [state]="'warning'">
          <span slot="title">Slotted Title (state=warning --p-banner-position-type: static)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
              <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner warning on dark background">
        <p-banner [state]="'warning'" [theme]="'dark'">
          <span slot="title">Slotted Title (state=warning --p-banner-position-type: static)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
              <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner error on light background">
        <p-banner [state]="'error'">
          <span slot="title">Slotted Title (state=error --p-banner-position-type: static)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
              <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner error on dark background">
        <p-banner [state]="'error'" [theme]="'dark'">
          <span slot="title">Slotted Title (state=error --p-banner-position-type: static)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
              <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner in persistent mode">
        <p-banner [persistent]="true">
          <span slot="title">Slotted Title (persistent=true --p-banner-position-type: static)</span>
          <span slot="description">Slotted description</span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner in basic width">
        <p-banner [width]="'basic'">
          <span slot="title">Slotted Title (width=basic --p-banner-position-type: static)</span>
          <span slot="description">Slotted description</span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner in fluid width which is mapped to extended">
        <p-banner [width]="'fluid'">
          <span slot="title">Slotted Title (width=fluid --p-banner-position-type: static)</span>
          <span slot="description">Slotted description</span>
        </p-banner>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {}
