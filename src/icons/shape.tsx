export function ShapeIcon(props: React.ComponentProps<'svg'>) {
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
      viewBox='0 0 24 24'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path d='M3 5a2 2 0 104 0 2 2 0 10-4 0M17 5a2 2 0 104 0 2 2 0 10-4 0M3 19a2 2 0 104 0 2 2 0 10-4 0M17 19a2 2 0 104 0 2 2 0 10-4 0M5 7v10M7 5h10M7 19h10M19 7v10'></path>
    </svg>
  );
}
