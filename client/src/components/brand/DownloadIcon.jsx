// Minimal architectural download glyph — square caps, mitered joins, mirrors
// the stroke language of LogoMark. Uses currentColor to follow either theme.
export function DownloadIcon({ size = 14, className = '' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M8 1.5v8.6" />
        <path d="M4.3 6.6 8 10.3l3.7-3.7" />
        <path d="M1.5 12.4v1.5a.6.6 0 0 0 .6.6h11.8a.6.6 0 0 0 .6-.6v-1.5" />
      </g>
    </svg>
  );
}
