const paths = {
  html: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  css: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.6-.2-1-.6-1.4-.4-.4-.6-.9-.6-1.4 0-1.1.9-2 2-2H16a5 5 0 0 0 0-10" />
      <circle cx="7.5" cy="10.5" r="1" />
      <circle cx="9.5" cy="6.8" r="1" />
      <circle cx="14.2" cy="6.5" r="1" />
    </>
  ),
  js: (
    <>
      <path d="M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2" />
      <path d="M10 9v5.2a1.8 1.8 0 0 1-3 1.3" />
      <path d="M17 10.2A2.2 2.2 0 0 0 12.8 9.6c-1.3 1.1-.4 2.4 1.5 3s2.6 1.9 1.3 3a2.3 2.3 0 0 1-3.4-.7" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="1.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
    </>
  ),
  tailwind: (
    <>
      <path d="M3.5 12c1.2-4 3.6-6 7.2-6 5.4 0 6 4 9.8 4.6-1.2 4-3.6 6-7.2 6-5.4 0-6-4-9.8-4.6Z" />
      <path d="M3.5 20c1.2-4 3.6-6 7.2-6 5.4 0 6 4 9.8 4.6" opacity=".5" />
    </>
  ),
  git: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 7v10" />
      <path d="M18 11c0 3-2.5 4-6 4H6" />
    </>
  ),
  node: (
    <>
      <path d="M12 2.8 20 7v10l-8 4.2L4 17V7l8-4.2Z" />
      <path d="M9.5 14.7c0 .8.7 1.3 2 1.3 1.4 0 2.2-.5 2.2-1.4 0-2.6-4.1-.9-4.1-3.2 0-.8.7-1.4 2-1.4 1.1 0 1.8.4 2 1.1" />
    </>
  ),
  next: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 16V8l7 9" />
      <path d="M16 8v4" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  rocket: (
    <>
      <path d="M14.5 4.5c2.5-2.5 5-2 5-2s.5 2.5-2 5L11 14l-2.5-2.5 6-7Z" />
      <path d="M8.5 11.5 5 13l-1 4 4-1 1.5-3.5" />
      <path d="M10.5 15.5c-1 1.5-3 2-3 2" />
      <circle cx="16" cy="8" r="1.2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5V6M12 18v2.5M3.5 12H6M18 12h2.5" />
    </>
  ),
  shuffle: (
    <>
      <path d="M3 7h3.5c4 0 4.5 10 8.5 10H21" />
      <path d="m18 14 3 3-3 3" />
      <path d="M3 17h3.5c1.6 0 2.6-1.7 3.6-3.7" />
      <path d="M14.2 7.7C15 7.3 15.8 7 16.8 7H21" />
      <path d="m18 4 3 3-3 3" />
    </>
  ),
  reset: (
    <>
      <path d="M4 4v6h6" />
      <path d="M4.5 13a8 8 0 1 0 2-6" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6.3 6.3 2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5" />
    </>
  ),
  play: <path d="M7 4.5v15l13-7.5Z" />,
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4" />
      <path d="M12 13v4M8.5 21h7M9.5 17.5h5v3.5h-5z" />
    </>
  ),
  arrowLeft: <path d="M19 12H5M11 18l-6-6 6-6" />,
}

export default function Icon({ name, size = 18, className = '', strokeWidth = 1.8 }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] || paths.spark}
    </svg>
  )
}
