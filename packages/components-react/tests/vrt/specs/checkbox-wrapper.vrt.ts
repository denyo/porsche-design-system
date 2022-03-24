import {
  defaultViewports,
  getVisualRegressionSkeletonTester,
  getVisualRegressionTester,
  itSkipSkeletons,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'checkbox-wrapper', '/checkbox-wrapper')).toBeFalsy();
});

itSkipSkeletons('should have no visual regression for skeleton', async () => {
  expect(
    await vrtTest(getVisualRegressionSkeletonTester(), 'checkbox-wrapper-skeleton', '/checkbox-wrapper-skeleton')
  ).toBeFalsy();
});
