import React from 'react';

import mapboxgl from 'mapbox-gl';

import { Tooltip } from '~/components/tooltip';

import { Paper } from './components/paper';
import { Tool } from './components/tool';
import { useDraw } from './hooks/use-draw';
import { useFeatures } from './hooks/use-features';
import { useMap } from './hooks/use-map';
import { useTools } from './hooks/use-tools';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function Map() {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = useMap(mapContainerRef);
  const drawRef = useDraw(mapRef);
  const { tools, activeToolId } = useTools(mapRef, drawRef);
  const { features, handleRemoveFeature } = useFeatures(mapRef);

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
