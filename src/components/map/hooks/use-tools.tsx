import React from 'react';

import { PolygonIcon } from '~/icons/polygon';
import { ShapeIcon } from '~/icons/shape';

import { ToolId } from '../utils/types';

export function useTools(
  mapRef: React.MutableRefObject<mapboxgl.Map | undefined>,
  drawRef: React.MutableRefObject<MapboxDraw | undefined>,
) {
  const [activeToolId, setAtiveToolId] = React.useState<ToolId>();

  React.useEffect(() => {
    const map = mapRef.current;

    const listener = (e: MapboxDraw.DrawModeChangeEvent) => {
      if (e.mode === 'simple_select') {
        setAtiveToolId(undefined);
      }
    };

    map?.on('draw.modechange', listener);

    return () => {
      map?.off('draw.modechange', listener);
    };
  }, [mapRef]);

  const tools: {
    id: ToolId;
    title: string;
    icon: React.ReactNode;
    onClick?: (id: ToolId) => void;
  }[] = React.useMemo(
    () => [
      {
        id: 'rectangle',
        title: 'Rectangle',
        icon: <ShapeIcon />,
        onClick: (id) => {
          setAtiveToolId((prevId) => {
            if (prevId === id) {
              return undefined;
            } else {
              drawRef.current?.changeMode('draw_rectangle');

              return id;
            }
          });
        },
      },
      {
        id: 'polygon',
        title: 'Polygon',
        icon: <PolygonIcon />,
        onClick: (id) => {
          setAtiveToolId((prevId) => (prevId === id ? undefined : id));
          drawRef.current?.changeMode('draw_polygon');
        },
      },
    ],
    [drawRef],
  );

  return {
    tools,
    activeToolId,
  };
}
