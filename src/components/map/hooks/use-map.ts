import React from 'react';

import mapboxgl from 'mapbox-gl';

export function useMap(mapContainerRef: React.RefObject<HTMLDivElement>) {
  const mapRef = React.useRef<mapboxgl.Map>();

  React.useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: import.meta.env.VITE_MAPBOX_STYLE,
      center: [33.535, 16.672],
      zoom: 9,
      antialias: true,
    });

    const map = mapRef.current;

    return () => map.remove();
  }, [mapContainerRef]);

  return mapRef;
}
