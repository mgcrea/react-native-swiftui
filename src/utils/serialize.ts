/**
 * The one serializer for everything that crosses the bridge as JSON.
 *
 * `JSON.stringify` omits keys whose value is `undefined`, and the Swift side
 * deliberately skips keys absent from the payload (`merge(from:presentKeys:)`).
 * Without a sentinel, clearing a prop (`maxLength: 10` -> `undefined`) would be
 * indistinguishable from not mentioning it, and so impossible.
 *
 * Updates only. The initial view tree is a plain `JSON.stringify`: on a first
 * decode an absent key and a `null` one both leave the default in place.
 */
export const serializeProps = (value: unknown): string =>
  JSON.stringify(value, (_key, item: unknown) => (item === undefined ? null : item));
