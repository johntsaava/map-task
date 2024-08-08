import React, { useState } from 'react';

import { Tooltip } from '~/components/tooltip';
import { PolygonIcon } from '~/icons/polygon';
import { ShapeIcon } from '~/icons/shape';

import { useMapContext } from '../../context/map';
import { Tool } from './components/tool';
import { ToolId } from './utils/types';

export function Toolbar() {
  const { drawRef, mapRef } = useMapContext();
  const [activeToolId, setAtiveToolId] = useState<ToolId>();

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

  React.useEffect(() => {
    mapRef.current?.on('draw.modechange', (e) => {
      if (e.mode === 'simple_select') {
        setAtiveToolId(undefined);
      }
    });
  }, [mapRef]);

  return (
    <div className='fixed left-0 right-0 top-0 z-10 grid h-12 grid-cols-3 items-center bg-black/40 px-4 shadow-lg backdrop-blur'>
      <h1 className='font-bold text-white lg:text-xl'>Map Task</h1>

      <div className='col-span-2 flex items-center'>
        <span className='text-xs italic text-white'>tools:</span>
        <div className='w-2' />
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
    </div>
  );
}
