import { createQuery } from 'react-query-kit';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';

import { supabase } from '~/supabase';

export const useFeaturesQuery = createQuery({
  queryKey: ['features'],
  fetcher: async () => {
    const res = await supabase.from('features').select('*');
    return res.data?.map((item) => ({
      ...item,
      feature_value: JSON.parse(item.feature_value as string),
    })) as
      | {
          id: number;
          created_at: string;
          feature_id: string;
          feature_value: Feature<Geometry, GeoJsonProperties>;
        }[]
      | null;
  },
});
