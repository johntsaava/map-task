import React from 'react';

import MapboxDraw, { DrawCustomMode } from '@mapbox/mapbox-gl-draw';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';

const modes = Object.assign(
  { ['draw_rectangle' as string]: DrawRectangle as DrawCustomMode },
  MapboxDraw.modes,
);

export function useDraw(mapRef: React.MutableRefObject<mapboxgl.Map | undefined>) {
  const drawRef = React.useRef<MapboxDraw>();

  React.useEffect(() => {
    const draw = new MapboxDraw({
      modes,
      displayControlsDefault: false,
    });

    drawRef.current = draw;
    mapRef.current?.on('load', () => {
      mapRef.current?.addControl(draw);
    });
  }, [mapRef]);

  return drawRef;
}
