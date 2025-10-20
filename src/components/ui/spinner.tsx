import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva('animate-spin rounded-full border-4 border-solid border-primary border-t-transparent', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export const Spinner = ({ size, className }: SpinnerProps) => {
  return <div className={cn(spinnerVariants({ size }), className)} />;
};
