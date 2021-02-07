import { SvgIconType } from '@ngneat/svg-icon/lib/types';

import { chevron, cloud, search, spinner, sun } from './icons';

export default {
  icons: [chevron, cloud, search, spinner, sun] as SvgIconType[],
  sizes: {
    xs: '10px',
    sm: '12px',
    md: '16px',
    lg: '20px'
  }
};
