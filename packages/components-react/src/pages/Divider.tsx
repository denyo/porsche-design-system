/* Auto Generated File */
import { PDivider } from '@porsche-design-system/components-react';

export const DividerPage = (): JSX.Element => {
  const style = `
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
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should show a divider">
        <PDivider />
      </div>

      <div className="playground light" title="should show divider with orientation=vertical">
        <div className="divider-vertical-container-example">
          <PDivider orientation="vertical" />
        </div>
      </div>
      <div className="playground light" title="should show divider with direction=vertical">
        <div className="divider-vertical-container-example">
          <PDivider direction="vertical" />
        </div>
      </div>

      <div className="playground light" title="should show responsive divider with orientation">
        <div className="divider-vertical-responsive-container-example">
          <PDivider
            orientation={{ base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' }}
           />
        </div>
      </div>
      <div className="playground light" title="should show responsive divider with direction">
        <div className="divider-vertical-responsive-container-example">
          <PDivider
            direction={{ base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' }}
           />
        </div>
      </div>

      <div className="playground light" title="should show different colors of divider">
        <PDivider />
        <br />
        <PDivider color="contrast-medium" />
        <br />
        <PDivider color="contrast-high" />
        <br />
        <PDivider color="neutral-contrast-low" />
        <br />
        <PDivider color="neutral-contrast-medium" />
        <br />
        <PDivider color="neutral-contrast-high" />
      </div>
    </>
  );
};
