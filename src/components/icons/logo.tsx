
export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c-5 0-9-2.5-9-5.5S5 11 12 11s9 2.5 9 5.5-4 5.5-9 5.5Z"/>
      <path d="M12 2c5 0 9 2.5 9 5.5S19 13 12 13 3 10.5 3 7.5 7 2 12 2Z"/>
    </svg>
  );
}
