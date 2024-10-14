import { CustomClassType } from '@/types/components';

export const EmojiIcon = ({ customClass = 'w-6 h-6' }: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    className={customClass}
  >
    <path
      d="M24 12c0-6.629-5.371-12-12-12S0 5.371 0 12s5.371 12 12 12 12-5.371 12-12zm0 0"
      fill="#ffc10e"
    />
    <path d="M19.879 12.008a7.879 7.879 0 11-15.758 0zm0 0" fill="#fff" />
    <path
      d="M10.238 7.86a1.885 1.885 0 10-3.769.003 1.885 1.885 0 003.77-.004zm0 0M17.363 7.86a1.884 1.884 0 10-3.767.001 1.884 1.884 0 003.767-.002zm0 0"
      fill="#333"
    />
  </svg>
);
