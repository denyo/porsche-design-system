import { expect, type Page, test } from '@playwright/test';
import {
  baseSchemes,
  baseThemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  generateGUID,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'radio-button-wrapper';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-radio-button-wrapper label="When input gets hovered or focused">
      <input type="radio" name="some-name" />
    </p-radio-button-wrapper>
    <div class="force-label">
      <p-radio-button-wrapper label="When label gets hovered or focused">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>
    </div>
    <p-radio-button-wrapper label="Some label">
      <input type="radio" name="some-name-disabled" disabled />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label">
      <input type="radio" name="${generateGUID()}" disabled checked />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" loading="true">
      <input type="radio" name="some-name-loading" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" loading="true">
      <input type="radio" name="${generateGUID()}" checked />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" state="error" message="Some error validation message.">
      <input type="radio" name="some-name" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" state="success" message="Some success validation message.">
      <input type="radio" name="some-name" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label">
      <input type="radio" name="${generateGUID()}" checked/>
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" state="error" message="Some error validation message.">
      <input type="radio" name="${generateGUID()}" checked/>
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" state="success" message="Some success validation message.">
      <input type="radio" name="${generateGUID()}" checked />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper>
      <span slot="label">
        Slotted label
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
      <input type="radio" name="some-name" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" state="error">
      <input type="radio" name="some-name" />
      <span slot="message">
        Slotted error message
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" state="success">
      <input type="radio" name="some-name" />
      <span slot="message">
        Slotted success message
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
    </p-radio-button-wrapper>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'block' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-radio-button-wrapper input[type="radio"]');
  await forceHoverState(page, '.hover .force-label > p-radio-button-wrapper >>> span');
  await forceHoverState(page, '.hover p-radio-button-wrapper span a');
  await forceFocusState(page, '.focus p-radio-button-wrapper input[type="radio"]');
  await forceFocusState(page, '.focus p-radio-button-wrapper span a');
  await forceFocusHoverState(page, '.focus-hover p-radio-button-wrapper input[type="radio"]');
  await forceFocusState(page, '.focus-hover .force-label > p-radio-button-wrapper input[type="radio"]');
  await forceHoverState(page, '.focus-hover .force-label > p-radio-button-wrapper >>> span');
  await forceFocusHoverState(page, '.focus-hover p-radio-button-wrapper span a');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseThemes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${theme}.png`
      );
    });
  });

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${scheme}.png`
      ); // fixture is aliased since result has to be equal
    });
  });
});
