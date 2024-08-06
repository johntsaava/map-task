import React from 'react';

import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function Map() {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
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
  }, []);

  return <div ref={mapContainerRef} className='w-full grow' />;
}
