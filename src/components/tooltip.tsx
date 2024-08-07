import * as T from '@radix-ui/react-tooltip';
import React from 'react';

export const Tooltip = ({
  title,
  children,
}: React.PropsWithChildren<{
  title: string;
}>) => {
  return (
    <T.Provider>
      <T.Root>
        <T.Trigger asChild>{children}</T.Trigger>
        <T.Portal>
          <T.Content
            className='data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 z-20 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]'
            sideOffset={5}
          >
            {title}
            <T.Arrow className='fill-white' />
          </T.Content>
        </T.Portal>
      </T.Root>
    </T.Provider>
  );
};
