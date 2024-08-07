export function PolygonIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      className='icon icon-tabler icons-tabler-outline icon-tabler-polygon'
      viewBox='0 0 24 24'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path d='M10 5a2 2 0 104 0 2 2 0 10-4 0M17 8a2 2 0 104 0 2 2 0 10-4 0M3 11a2 2 0 104 0 2 2 0 10-4 0M13 19a2 2 0 104 0 2 2 0 10-4 0M6.5 9.5l3.5-3M14 5.5L17 7M18.5 10L16 17M13.5 17.5l-7-5'></path>
    </svg>
  );
}
