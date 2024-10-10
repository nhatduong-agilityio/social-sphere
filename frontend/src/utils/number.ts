export const formatNumber = (num: number): string =>
  num >= 1e6
    ? `${(num / 1e6).toFixed(1).replace(/\.0$/, '')}M`
    : num >= 1e3
      ? `${(num / 1e3).toFixed(1).replace(/\.0$/, '')}K`
      : num.toString();
