import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface PopButtonProps {
  rotate?: string;
  icon?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const PopButton = ({
  rotate = '0deg',
  isActive = true,
  icon,
  onClick,
}: PopButtonProps) => {
  const activeTransform = `translate(-50%, -50%) rotate(${rotate}) translateY(-90px)`;
  const inactiveTransform = 'translate(0, -10px) rotate(10deg)';

  return (
    <Button
      size="icon"
      className="-z-10 absolute border-none dark:bg-dark-900 rounded-full w-[34px] h-[34px] transition-all duration-300"
      style={{ transform: isActive ? activeTransform : inactiveTransform }}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

export default PopButton;
