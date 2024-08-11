import React from 'react';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';

export function useFeatures(mapRef: React.MutableRefObject<mapboxgl.Map | undefined>) {
  const [features, setFeature] = React.useState<Feature<Geometry, GeoJsonProperties>[]>([]);
  const handleAddFeature = React.useCallback(
    (...feature: Feature<Geometry, GeoJsonProperties>[]) => {
      setFeature((state) => [...state, ...feature]);
    },
    [],
  );
  const handleRemoveFeature = React.useCallback((id: string) => {
    setFeature((state) => state.filter((item) => item.id !== id));
  }, []);

  React.useEffect(() => {
    const map = mapRef.current;

    const listener = (e: MapboxDraw.DrawCreateEvent) => {
      handleAddFeature(...e.features);
    };

    map?.on('draw.create', listener);

    return () => {
      map?.off('draw.create', listener);
    };
  }, [mapRef, handleAddFeature]);

  return { features, handleRemoveFeature };
}
