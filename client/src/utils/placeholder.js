// Some studio facts (exact project addresses, a city name) genuinely have
// not been supplied yet. Rather than invent them, data files mark them with
// these sentinel strings — components use isUnset() to omit that one field
// gracefully instead of rendering the raw placeholder as visible copy.
const UNSET_VALUES = new Set(['TO BE CONFIRMED', 'TO BE SUPPLIED']);

export function isUnset(value) {
  return !value || UNSET_VALUES.has(value);
}
