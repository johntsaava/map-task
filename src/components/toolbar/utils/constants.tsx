import { PolygonIcon } from '~/icons/polygon';
import { ShapeIcon } from '~/icons/shape';

import { ToolId } from './types';

export const tools: {
  id: ToolId;
  title: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'rectangle',
    title: 'Rectangle',
    icon: <ShapeIcon />,
  },
  {
    id: 'polygon',
    title: 'Polygon',
    icon: <PolygonIcon />,
  },
];
