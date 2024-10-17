import { MOODS_TITLE, MOODS } from '../constants/compose-form';

export const getMoodTitle = (label: string) =>
  label ? MOODS_TITLE[label as MOODS] : undefined;
