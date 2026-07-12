// Inline source-of-truth for the AY monogram — kept in sync with
// public/brand/logo-mark*.svg. Uses currentColor so it follows whatever
// text color the surrounding theme (light or dark section) already sets.
export function LogoMark({ className = '', size = 22, ...rest }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M14,98 L44,16 L76,62 L106,16" />
        <path d="M76,62 L76,76" />
        <path d="M76,84 L76,98" />
      </g>
    </svg>
  );
}
