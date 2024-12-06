import { getMoodTitle, getMoodOptions } from '../feed';
import {
  MOODS,
  MOODS_TITLE,
  MOOD_OPTIONS,
  MOOD_DETAILS,
} from '../../constants';

describe('Feed Utils', () => {
  describe('getMoodTitle', () => {
    it('should return the correct mood title when valid label is provided', () => {
      expect(getMoodTitle('status')).toBe(MOODS_TITLE[MOODS.STATUS]);
      expect(getMoodTitle('drinking')).toBe(MOODS_TITLE[MOODS.DRINKING]);
      expect(getMoodTitle('eating')).toBe(MOODS_TITLE[MOODS.EATING]);
    });

    it('should return undefined when invalid label is provided', () => {
      expect(getMoodTitle('invalid')).toBeUndefined();
    });

    it('should return undefined when empty label is provided', () => {
      expect(getMoodTitle('')).toBeUndefined();
    });
  });

  describe('getMoodOptions', () => {
    it('should return correct mood option and detail when both exist', () => {
      const result = getMoodOptions('status', 'awesome');

      expect(result.moodOption).toEqual(
        MOOD_OPTIONS.find((opt) => opt.value === 'status'),
      );
      expect(result.moodDetail).toEqual(
        MOOD_DETAILS[MOODS.STATUS].find((detail) => detail.value === 'awesome'),
      );
    });

    it('should return mood option but null detail when content does not exist', () => {
      const result = getMoodOptions('status', 'nonexistent');

      expect(result.moodOption).toEqual(
        MOOD_OPTIONS.find((opt) => opt.value === 'status'),
      );
      expect(result.moodDetail).toBeUndefined();
    });

    it('should return null for both when mood name does not exist', () => {
      const result = getMoodOptions('nonexistent', 'awesome');

      expect(result).toEqual({
        moodOption: null,
        moodDetail: null,
      });
    });

    it('should return null for both when no parameters are provided', () => {
      const result = getMoodOptions();

      expect(result).toEqual({
        moodOption: null,
        moodDetail: null,
      });
    });
  });
});
