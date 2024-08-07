import React from 'react';

import mapboxgl from 'mapbox-gl';

import { MapContext } from './context/map';
import { useDraw } from './hooks/use-draw';
import { useMap } from './hooks/use-map';
import { Toolbar } from './toolbar';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function Map() {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = useMap(mapContainerRef);
  const drawRef = useDraw(mapRef);

  return (
    <MapContext.Provider value={{ mapRef, drawRef }}>
      <Toolbar />
      <div ref={mapContainerRef} className='w-full grow' />
    </MapContext.Provider>
  );
}
