import {
  MOODS_TITLE,
  MOODS,
  MOOD_OPTIONS,
  MOOD_DETAILS,
} from '../constants/compose-form';

export const getMoodTitle = (label: string) =>
  label ? MOODS_TITLE[label as MOODS] : undefined;

export const getMoodOptions = (name: string, content: string) => {
  const moodOption = MOOD_OPTIONS.find((option) => option.value === name);

  if (!moodOption) {
    return { moodOption: null, moodDetail: null };
  }

  const moodDetails = MOOD_DETAILS[name as MOODS];
  const moodDetail = moodDetails?.find((detail) => detail.value === content);

  return { moodOption, moodDetail };
};
