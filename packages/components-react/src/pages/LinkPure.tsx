import { PLinkPure } from '@porsche-design-system/components-react';

export const LinkPurePage = (): JSX.Element => {
  const style = `
    p-link-pure:not(:last-child) {
      margin-right: 8px;
    }
  `;
  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render with label">
        <PLinkPure href="https://www.porsche.com">Some label</PLinkPure>
        <PLinkPure>
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>
      <div className="playground dark" title="should render with label on dark background">
        <PLinkPure href="https://www.porsche.com" theme="dark">
          Some label
        </PLinkPure>
        <PLinkPure theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render without label">
        <PLinkPure href="https://www.porsche.com" hideLabel>
          Some label
        </PLinkPure>
        <PLinkPure hideLabel>
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>
      <div className="playground dark" title="should render without label on dark background">
        <PLinkPure href="https://www.porsche.com" hideLabel theme="dark">
          Some label
        </PLinkPure>
        <PLinkPure hideLabel theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with responsive label">
        <PLinkPure
          href="https://www.porsche.com"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          Some label
        </PLinkPure>
        <PLinkPure
          href="https://www.porsche.com"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          Some label
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with different size">
        <PLinkPure href="https://www.porsche.com" size="x-small">
          Some label
        </PLinkPure>
        <PLinkPure size="x-small">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="small">
          Some label
        </PLinkPure>
        <PLinkPure size="small">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="medium">
          Some label
        </PLinkPure>
        <PLinkPure size="medium">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="large">
          Some label
        </PLinkPure>
        <PLinkPure size="large">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="x-large">
          Some label
        </PLinkPure>
        <PLinkPure size="x-large">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="inherit" style={{ fontSize: 48 }}>
          Some label
        </PLinkPure>
        <PLinkPure size="inherit" style={{ fontSize: 48 }}>
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with responsive size">
        <PLinkPure
          href="https://www.porsche.com"
          size={{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }}
          style={{ fontSize: 48 }}
        >
          Some label
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with different weight">
        <PLinkPure href="https://www.porsche.com" weight="thin">
          Some label
        </PLinkPure>
        <PLinkPure weight="thin">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" weight="regular">
          Some label
        </PLinkPure>
        <PLinkPure weight="regular">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" weight="bold">
          Some label
        </PLinkPure>
        <PLinkPure weight="bold">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with active state">
        <PLinkPure href="https://www.porsche.com" active>
          Some label
        </PLinkPure>
        <PLinkPure active>
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>

      <div className="playground dark" title="should render with active state on dark background">
        <PLinkPure href="https://www.porsche.com" active theme="dark">
          Some label
        </PLinkPure>
        <PLinkPure active theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with specific icon">
        <PLinkPure href="https://www.porsche.com" icon="phone">
          Some label
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" iconSource="./assets/icon-custom-kaixin.svg">
          Some label
        </PLinkPure>
      </div>

      <div className="playground dark" title="should render with specific icon on dark background">
        <PLinkPure href="https://www.porsche.com" icon="phone" theme="dark">
          Some label
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" iconSource="./assets/icon-custom-kaixin.svg" theme="dark">
          Some label
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with multiline label">
        <PLinkPure href="https://www.porsche.com" style={{ width: 240 }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing
        </PLinkPure>
        <PLinkPure style={{ width: 240 }}>
          <a href="https://www.porsche.com">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with custom clickable area">
        <PLinkPure href="https://www.porsche.com" style={{ padding: '1rem' }}>
          Some label
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" hideLabel style={{ padding: '1rem' }}>
          Some label
        </PLinkPure>
        <PLinkPure style={{ padding: '1rem' }}>
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
        <PLinkPure hideLabel style={{ padding: '1rem' }}>
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with subline">
        <PLinkPure href="https://www.porsche.com" size="small">
          Some label<p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" size="medium">
          Some label<p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" size="large">
          Some label<p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" size="x-large">
          Some label<p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure size="large">
          <a href="https://www.porsche.com">Some label</a>
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with no icon">
        <PLinkPure href="https://www.porsche.com" icon="none">
          Without icon
        </PLinkPure>
        <PLinkPure icon="none">
          <a href="https://www.porsche.com">Slotted without icon</a>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" size="small" icon="none">
          Without icon
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render icon if hide-label and icon none is set">
        <PLinkPure href="https://www.porsche.com" hide-label={true} icon="none">
          With hideLabel and no icon
        </PLinkPure>
        <PLinkPure hide-label={true} icon="none">
          <a href="https://www.porsche.com">Slotted with hideLabel and no icon</a>
        </PLinkPure>
        <PLinkPure hide-label={true} size="small" icon="none">
          <a href="https://www.porsche.com">With hideLabel and no icon</a>
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>

      <div className="playground light" title="should align label to the left">
        <PLinkPure href="https://www.porsche.com" alignLabel="left">
          Align-label left
        </PLinkPure>
        <PLinkPure alignLabel="left">
          <a href="https://www.porsche.com">Slotted align-label left</a>
        </PLinkPure>
      </div>
      <div className="playground light" title="should align label to the left or right depending on viewport">
        <PLinkPure
          href="https://www.porsche.com"
          alignLabel={{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }}
        >
          With breakpoint customizable align-label
        </PLinkPure>
        <PLinkPure alignLabel={{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }}>
          <a href="https://www.porsche.com">Slotted with breakpoint customizable align-label</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with stretched label">
        <PLinkPure href="https://www.porsche.com" stretch={true}>
          Stretched icon left
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" stretch={true} alignLabel="left">
          Stretched icon right
        </PLinkPure>
        <PLinkPure stretch={true}>
          <a href="https://www.porsche.com">Slotted stretched icon left</a>
        </PLinkPure>
        <PLinkPure stretch={true} alignLabel="left">
          <a href="https://www.porsche.com">Slotted stretched icon right</a>
        </PLinkPure>
      </div>
      <div className="playground light" title="should render with stretched label depending on viewport">
        <PLinkPure
          href="https://www.porsche.com"
          stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          Stretched depending on viewport
        </PLinkPure>
      </div>

      <div className="playground light" title="should not align label left or stretch if it has a subline">
        <PLinkPure href="https://www.porsche.com" alignLabel="left">
          With align-label and subline
          <p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" stretch={true}>
          With stretch and subline
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>
    </>
  );
};
