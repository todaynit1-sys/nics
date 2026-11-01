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
