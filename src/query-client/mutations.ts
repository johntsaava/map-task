import { createMutation } from 'react-query-kit';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';

import { supabase } from '~/supabase';

export const useCreateFeatureMutation = createMutation({
  mutationKey: ['create', 'feature'],
  mutationFn: async (variables: { features: Feature<Geometry, GeoJsonProperties>[] }) =>
    supabase.from('features').insert(
      variables.features.flatMap((feature) => [
        {
          feature_id: String(feature.id),
          feature_value: JSON.stringify(feature),
        },
      ]),
    ),
});

export const useDeleteFeatureMutation = createMutation({
  mutationKey: ['delete', 'feature'],
  mutationFn: async (variables: { featureId: string }) =>
    supabase.from('features').delete().eq('feature_id', variables.featureId),
});

export const useEditFeatureMutation = createMutation({
  mutationKey: ['edit', 'feature'],
  mutationFn: async (variables: { feature: Feature<Geometry, GeoJsonProperties> }) =>
    supabase
      .from('features')
      .update({
        feature_id: String(variables.feature.id),
        feature_value: JSON.stringify(variables.feature),
      })
      .eq('feature_id', String(variables.feature.id)),
});
