// Small line icons drawn for this page (24×24, currentColor).

const paths = {
  alert: "M12 3.5 2.8 19.5h18.4L12 3.5zM12 10v4.5M12 17.2v.3",
  siren: "M7 18v-5a5 5 0 0 1 10 0v5M4.5 21h15M12 3v2M4.2 6.2l1.4 1.4M19.8 6.2l-1.4 1.4M12 11v4",
  radar: "M12 12 18.4 5.6M21 12a9 9 0 1 1-9-9M17 12a5 5 0 1 1-5-5M12 12h.01",
  shield: "M12 3 4.5 6v5.6c0 4.6 3.2 8.2 7.5 9.4 4.3-1.2 7.5-4.8 7.5-9.4V6L12 3zM8.8 12l2.2 2.2 4.4-4.4",
  search: "M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4zM16 16l4.8 4.8",
  edu: "M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9zM6.5 11v4.8c0 1.2 2.5 2.7 5.5 2.7s5.5-1.5 5.5-2.7V11M21.5 9v5.5",
  phone: "M5 3.8h3.2l1.6 4-2.1 1.4a10.6 10.6 0 0 0 5.1 5.1l1.4-2.1 4 1.6V17a2.2 2.2 0 0 1-2.2 2.2A15.2 15.2 0 0 1 2.8 6 2.2 2.2 0 0 1 5 3.8z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  chevron: "M9 6l6 6-6 6",
  down: "M6 9l6 6 6-6",
  play: "M8 5.5v13l10.5-6.5L8 5.5z",
  pause: "M8 5v14M16 5v14",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  flask: "M9.5 3h5M10.5 3v6L5 18.5A1.6 1.6 0 0 0 6.4 21h11.2a1.6 1.6 0 0 0 1.4-2.5L13.5 9V3M7.5 15h9",
  home: "M3.5 10.5 12 3.5l8.5 7M5.5 9v11h4.5v-6h4v6h4.5V9",
  grid: "M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z",
  news: "M5 4.5h11.5v15H6.5A1.5 1.5 0 0 1 5 18V4.5zM16.5 8.5H19V18a1.5 1.5 0 0 1-3 0M8 8.5h5.5M8 12h5.5M8 15.5h3.5",
  download: "M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4.5 17v2.5h15V17",
  share: "M12 3.5v11M8 7.5l4-4 4 4M6.5 11H5v9.5h14V11h-1.5",
  plus: "M12 5v14M5 12h14",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, stroke = 1.8, className }: { name: IconName; size?: number; stroke?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
