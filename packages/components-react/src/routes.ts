import { RouteProps } from 'react-router-dom';
import * as fromPages from './pages';

export type RouteType = RouteProps & {
  name: string;
  path: string; // override string | string[]
};

export const routes: RouteType[] = [
  {
    name: 'Button',
    path: '/button',
    component: fromPages.ButtonPage
  },
  {
    name: 'Button Pure',
    path: '/button-pure',
    component: fromPages.ButtonPurePage
  },
  {
    name: 'Checkbox',
    path: '/checkbox-wrapper',
    component: fromPages.CheckboxWrapperPage
  },
  {
    name: 'Content Wrapper',
    path: '/content-wrapper',
    component: fromPages.ContentWrapperPage
  },
  {
    name: 'Divider',
    path: '/divider',
    component: fromPages.DividerPage
  },
  {
    name: 'Fieldset',
    path: '/fieldset-wrapper',
    component: fromPages.FieldsetWrapperPage
  },
  {
    name: 'Flex',
    path: '/flex',
    component: fromPages.FlexPage
  },
  {
    name: 'Grid',
    path: '/grid',
    component: fromPages.GridPage
  },
  {
    name: 'Icon',
    path: '/icon',
    component: fromPages.IconPage
  },
  {
    name: 'Layout',
    path: '/layout',
    component: fromPages.LayoutPage
  },
  {
    name: 'Navigation',
    path: '/navigation',
    component: fromPages.NavigationPage
  },
  {
    name: 'Overview',
    path: '/overview',
    component: fromPages.OverviewPrefixedPage
  }
];
