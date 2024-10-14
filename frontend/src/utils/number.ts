export const formatNumber = (num: number): string =>
  num >= 1e6
    ? `${(num / 1e6).toFixed(1).replace(/\.0$/, '')}M`
    : num >= 1e3
      ? `${(num / 1e3).toFixed(1).replace(/\.0$/, '')}K`
      : num.toString();

export const convertSecondsToMinutes = (seconds: number) => {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  const formattedSeconds: string =
    remainingSeconds < 10
      ? `0${remainingSeconds}`
      : remainingSeconds.toString();

  return `${minutes}:${formattedSeconds}`;
};
