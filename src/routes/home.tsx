import { Map } from '~/components/map';
import { Toolbar } from '~/components/toolbar';

export function Component() {
  return (
    <>
      <Map />
      <Toolbar />
    </>
  );
}

Component.displayName = 'Home';
