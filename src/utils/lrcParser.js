const METADATA_REGEX = /^\[(ar|ti|al|offset):(.+)\]$/i;
const TIMESTAMP_REGEX = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\]/g;

const toMilliseconds = (minutes, seconds, fraction = '0') => {
  const mins = parseInt(minutes, 10);
  const secs = parseInt(seconds, 10);
  const frac = parseInt(fraction.padEnd(3, '0'), 10);
  return mins * 60 * 1000 + secs * 1000 + frac;
};

export const parseLrc = (content) => {
  if (!content) {
    return { metadata: {}, lines: [] };
  }

  const metadata = {};
  const lines = [];

  content.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) return;

    const metadataMatch = line.match(METADATA_REGEX);
    if (metadataMatch) {
      const [, key, value] = metadataMatch;
      const normalizedKey = key.toLowerCase();
      if (normalizedKey === 'offset') {
        metadata.offset = parseInt(value, 10) || 0;
      } else if (normalizedKey === 'ar') {
        metadata.artist = value.trim();
      } else if (normalizedKey === 'ti') {
        metadata.title = value.trim();
      } else if (normalizedKey === 'al') {
        metadata.album = value.trim();
      }
      return;
    }

    const timestamps = [...line.matchAll(TIMESTAMP_REGEX)];
    if (!timestamps.length) {
      return;
    }

    const text = line.replace(TIMESTAMP_REGEX, '').trim();

    timestamps.forEach((match) => {
      const [, minutes, seconds, fractionGroup] = match;
      const fraction = (fractionGroup || '0').replace(/[:.]/g, '');
      const time = toMilliseconds(minutes, seconds, fraction);
      lines.push({
        time,
        text,
        original: text,
      });
    });
  });

  lines.sort((a, b) => a.time - b.time);

  return {
    metadata,
    lines,
  };
};

export default parseLrc;




