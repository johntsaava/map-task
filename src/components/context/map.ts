import React, { useContext } from 'react';

import MapboxDraw from '@mapbox/mapbox-gl-draw';

export const MapContext = React.createContext<{
  mapRef: React.MutableRefObject<mapboxgl.Map | undefined>;
  drawRef: React.MutableRefObject<MapboxDraw | undefined>;
} | null>(null);

export function useMapContext() {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error('Use useMapContext within MapContext.Provider');
  }

  return context;
}
