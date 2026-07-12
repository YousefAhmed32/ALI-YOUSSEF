// Splits a word into individually addressable glyph spans for pointer
// interaction / entrance stagger, while keeping the word screen-reader-safe.
export function LetterType({ word, className = '', dataAttr = 'data-letter' }) {
  return (
    <span className={`letter-type ${className}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <span key={i} {...{ [dataAttr]: true }} className="letter-type__glyph">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}
