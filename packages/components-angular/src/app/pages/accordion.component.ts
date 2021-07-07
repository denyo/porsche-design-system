import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-accordion',
  template: `
    <div class="playground light" title="should render accordion on light background">
      <p-accordion [heading]="'Some heading'">
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion on dark background">
      <p-accordion [heading]="'Some heading'" [theme]="'dark'">
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground light" title="should render accordion with slotted heading on light background">
      <p-accordion>
        <span slot="heading">Some slotted heading</span>
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion with slotted heading on dark background">
      <p-accordion [theme]="'dark'">
        <span slot="heading">Some slotted heading</span>
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground light" title="should render accordion size medium on light background">
      <p-accordion [heading]="'Some heading size medium'" [size]="'medium'">
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion size medium on dark background">
      <p-accordion [heading]="'Some heading size medium'" [theme]="'dark'" [size]="'medium'">
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground light" title="should render accordion with breakpoint customizable size on light background">
      <p-accordion
        [heading]="'Some heading responsive size'"
        [size]="{ base: 'small', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }"
      >
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion with breakpoint customizable size on dark background">
      <p-accordion
        [heading]="'Some heading responsive size'"
        [theme]="'dark'"
        [size]="{ base: 'small', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }"
      >
        {{ content }}
      </p-accordion>
    </div>

    <div
      class="playground light"
      title="should render accordion with long heading that breaks to second line on light background"
      style="max-width: 400px"
    >
      <p-accordion>
        <span slot="heading" style="background: deeppink">
          Some extra long heading that should break to the second line
        </span>
        {{ content }}
      </p-accordion>
    </div>

    <div
      class="playground dark"
      title="should render accordion with long heading that breaks to second line on dark background"
      style="max-width: 400px"
    >
      <p-accordion [theme]="'dark'">
        <span slot="heading" style="background: deeppink">
          Some extra long heading that should break to the second line
        </span>
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground light" title="should render multiple accordions with one open on light background">
      <p-accordion [heading]="'Some heading'">
        {{ content }}
      </p-accordion>
      <p-accordion [heading]="'Some heading'" [open]="true">
        {{ content }}
      </p-accordion>
      <p-accordion [heading]="'Some heading'">
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground dark" title="should render multiple accordions with one open on dark background">
      <p-accordion [heading]="'Some heading'" [theme]="'dark'">
        {{ content }}
      </p-accordion>
      <p-accordion [heading]="'Some heading'" [open]="true" [theme]="'dark'">
        <div style="color: white">
          {{ content }}
        </div>
      </p-accordion>
      <p-accordion [heading]="'Some heading'" [theme]="'dark'">
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground light" title="should render multiple compact accordions with one open on light background">
      <p-accordion [heading]="'Some compact Accordion heading'" [compact]="true">
        {{ content }}
      </p-accordion>
      <p-accordion [heading]="'Some compact Accordion heading'" [compact]="true" [open]="true">
        {{ content }}
      </p-accordion>
      <p-accordion [heading]="'Some compact Accordion heading'" [compact]="true">
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground dark" title="should render multiple compact accordions with one open on dark background">
      <p-accordion [heading]="'Some compact Accordion heading'" [compact]="true" [theme]="'dark'">
        {{ content }}
      </p-accordion>
      <p-accordion [heading]="'Some compact Accordion heading'" [compact]="true" [open]="true" [theme]="'dark'">
        <div style="color: white">
          {{ content }}
        </div>
      </p-accordion>
      <p-accordion [heading]="'Some compact Accordion heading'" [compact]="true" [theme]="'dark'">
        {{ content }}
      </p-accordion>
    </div>

    <div class="playground light" title="should render navigation like accordion on light background">
      <p-accordion [heading]="'Some Category'" [compact]="true">
        <p-link-pure href="https://www.porsche.com">Some link</p-link-pure>
        <br />
        <p-link-pure href="https://www.porsche.com">Some link</p-link-pure>
      </p-accordion>
      <p-accordion [heading]="'Some Category'" [compact]="true" [open]="true">
        <p-link-pure href="https://www.porsche.com">Some link</p-link-pure>
        <br />
        <p-link-pure href="https://www.porsche.com">Some link</p-link-pure>
      </p-accordion>
    </div>

    <div class="playground dark" title="should render navigation like accordion on dark background">
      <p-accordion [heading]="'Some Category'" [compact]="true" [theme]="'dark'">
        <p-link-pure href="https://www.porsche.com" [theme]="'dark'">Some link</p-link-pure>
        <br />
        <p-link-pure href="https://www.porsche.com" [theme]="'dark'">Some link</p-link-pure>
      </p-accordion>
      <p-accordion [heading]="'Some Category'" [compact]="true" [open]="true" [theme]="'dark'">
        <p-link-pure href="https://www.porsche.com" [theme]="'dark'">Some link</p-link-pure>
        <br />
        <p-link-pure href="https://www.porsche.com" [theme]="'dark'">Some link</p-link-pure>
      </p-accordion>
    </div>

    <div class="playground light" title="should ignore size prop and render compact accordion">
      <p-accordion [heading]="'Some compact Accordion with ignored size prop'" [compact]="true" [size]="'medium'">
        {{ content }}
      </p-accordion>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';
}
