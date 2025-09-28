export function Loader() {
  const style = `
    .plant-loader-path {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: plant-loader-dash 2s ease-in-out infinite;
    }
    @keyframes plant-loader-dash {
      0% { stroke-dashoffset: 1000; }
      50% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -1000; }
    }
  `;

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground">
      <style>{style}</style>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
      >
        <path
          d="M7 20v-2a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="plant-loader-path"
          style={{ animationDelay: '0.5s' }}
        />
        <path
          d="M12 13a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="plant-loader-path"
        />
      </svg>
      Analyzing...
    </div>
  );
}
