import React from 'react';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';

import {
  useCreateFeatureMutation,
  useDeleteFeatureMutation,
  useEditFeatureMutation,
} from '~/query-client/mutations';
import { useFeaturesQuery } from '~/query-client/queries';

export function useFeatures(
  mapRef: React.MutableRefObject<mapboxgl.Map | undefined>,
  drawRef: React.MutableRefObject<MapboxDraw | undefined>,
) {
  const createFeatureMutation = useCreateFeatureMutation();
  const deleteFeatureMutation = useDeleteFeatureMutation();
  const editFeatureMutation = useEditFeatureMutation();
  const featuresQuery = useFeaturesQuery({
    placeholderData: [],
  });
  const [features, setFeatures] = React.useState<Feature<Geometry, GeoJsonProperties>[]>([]);
  const handleAddFeature = React.useCallback(
    (...feature: Feature<Geometry, GeoJsonProperties>[]) => {
      createFeatureMutation.mutate(
        { features: [...feature] },
        {
          onSuccess: () => {
            setFeatures((state) => [...state, ...feature]);
          },
        },
      );
    },
    [createFeatureMutation],
  );
  const handleRemoveFeature = React.useCallback(
    (id: string) => {
      deleteFeatureMutation.mutate(
        { featureId: id },
        {
          onSuccess: () => {
            setFeatures((state) => state.filter((item) => item.id !== id));
          },
        },
      );
    },
    [deleteFeatureMutation],
  );

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

  React.useEffect(() => {
    const map = mapRef.current;

    const listener = (e: MapboxDraw.DrawUpdateEvent) => {
      e.features.forEach((feature) => {
        editFeatureMutation.mutate({
          feature,
        });
      });
    };

    map?.on('draw.update', listener);

    return () => {
      map?.off('draw.update', listener);
    };
  }, [mapRef, editFeatureMutation]);

  React.useEffect(() => {
    const draw = drawRef.current;
    const map = mapRef.current;

    setFeatures(featuresQuery.data?.map((item) => item.feature_value) || []);

    const listener = () => {
      featuresQuery.data?.forEach((feature) => {
        draw?.add(feature.feature_value);
      });
    };

    map?.on('load', listener);
  }, [featuresQuery.data, drawRef, mapRef]);

  return { features, handleRemoveFeature };
}
