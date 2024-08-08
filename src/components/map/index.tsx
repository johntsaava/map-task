import React from 'react';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import mapboxgl from 'mapbox-gl';

import { Tooltip } from '~/components/tooltip';
import { PolygonIcon } from '~/icons/polygon';
import { ShapeIcon } from '~/icons/shape';

import { Paper } from './components/paper';
import { Tool } from './components/tool';
import { useDraw } from './hooks/use-draw';
import { useMap } from './hooks/use-map';
import { ToolId } from './utils/types';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function Map() {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = useMap(mapContainerRef);
  const drawRef = useDraw(mapRef);
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

  const tools: {
    id: ToolId;
    title: string;
    icon: React.ReactNode;
    onClick?: (id: ToolId) => void;
  }[] = [
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
  ];

  return (
    <>
      <div ref={mapContainerRef} className='w-full grow' />

      <div className='fixed bottom-4 left-4 top-4 z-10 flex w-56 flex-col gap-4'>
        <h1 className='font-bold lg:text-xl'>Map Task</h1>

        <Paper className='flex flex-col gap-2'>
          <span className='text-xs italic text-white'>Tools:</span>
          <div className='flex items-center gap-2'>
            {tools.map((tool) => (
              <Tooltip key={tool.id} title={tool.title}>
                <Tool
                  active={tool.id === activeToolId}
                  onClick={() => {
                    tool.onClick?.(tool.id);
                  }}
                >
                  {tool.icon}
                </Tool>
              </Tooltip>
            ))}
          </div>
        </Paper>

        <Paper className='flex flex-col gap-2'>
          <span className='text-xs italic text-white'>Objects ({features.length}):</span>
          <div className='flex flex-col gap-2'>
            {features.length > 0 ? (
              features.map((feature, i) => (
                <div
                  className='flex items-center gap-2 rounded-md p-2 text-left text-white'
                  key={i}
                >
                  <span className='truncate'>{feature.id}</span>
                  <button
                    onClick={() => {
                      drawRef.current?.changeMode('direct_select', {
                        featureId: feature.id as string,
                      });
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => {
                      handleRemoveFeature(feature.id as string);
                      drawRef.current?.delete(feature.id as string);
                    }}
                  >
                    delete
                  </button>
                </div>
              ))
            ) : (
              <span className='mx-auto text-xs italic text-white'>no objects</span>
            )}
          </div>
        </Paper>
      </div>
    </>
  );
}
