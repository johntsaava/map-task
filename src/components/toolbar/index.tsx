import { useState } from 'react';

import { Tooltip } from '~/components/tooltip';

import { Tool } from './components/tool';
import { tools } from './utils/constants';
import { ToolId } from './utils/types';

export function Toolbar() {
  const [activeToolId, setAtiveToolId] = useState<ToolId>();

  return (
    <div className='fixed left-0 right-0 top-0 grid h-12 grid-cols-3 items-center bg-black/40 px-4 shadow-lg backdrop-blur'>
      <h1 className='font-bold text-white lg:text-xl'>Map Task</h1>

      <div className='col-span-2 flex items-center'>
        <span className='text-xs italic text-white'>tools:</span>
        <div className='w-2' />
        {tools.map((tool) => (
          <Tooltip key={tool.id} title={tool.title}>
            <Tool
              active={tool.id === activeToolId}
              onClick={() => {
                setAtiveToolId((prevId) => (prevId === tool.id ? undefined : tool.id));
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
