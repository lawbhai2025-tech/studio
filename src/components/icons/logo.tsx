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
      <path d="M7 20v-2a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v2" />
      <path d="M12 13a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4Z" />
    </svg>
  );
}
