// ─── calculations.js ──────────────────────────────────────────────
// Pure math helpers used across components.

/** Return the watch progress as a 0–100 percentage. */
export function calcProgressPercent(watchedEpisodes, totalEpisodes) {
  if (!totalEpisodes || totalEpisodes <= 0) return 0;
  return Math.min(100, Math.round((watchedEpisodes / totalEpisodes) * 100));
}

/** Estimate remaining minutes to finish a TV show. */
export function calcRemainingTime(watchedEpisodes, totalEpisodes, avgEpisodeDurationMinutes = 45) {
  const remaining = Math.max(0, totalEpisodes - watchedEpisodes);
  return remaining * avgEpisodeDurationMinutes;
}

/** Count items in an array that match a condition. */
export function countBy(arr, predicate) {
  return arr.filter(predicate).length;
}

/** Group an array of objects by a key. Returns { keyValue: [items] }. */
export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key] ?? 'Unknown';
    acc[group] = [...(acc[group] ?? []), item];
    return acc;
  }, {});
}

/** Compute the average of a numeric array. Returns 0 for empty arrays. */
export function average(nums) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
