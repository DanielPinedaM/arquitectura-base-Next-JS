'use client';
import dynamic from 'next/dynamic';
import Button from '@/shared/ui/buttons/Button';
import { AlertDialog } from '@shad-cn/AlertDialog';
import { AlertDialogContent } from '@shad-cn/AlertDialogContent';
import { AlertDialogDescription } from '@shad-cn/AlertDialogDescription';
import { AlertDialogFooter } from '@shad-cn/AlertDialogFooter';
import { AlertDialogHeader } from '@shad-cn/AlertDialogHeader';
import { AlertDialogTitle } from '@shad-cn/AlertDialogTitle';
const FaQuestionCircle = dynamic(() =>
  import('react-icons/fa').then((mod) => mod.FaQuestionCircle),
);

interface IConfirmDialog {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  onClickAccept: () => void;
  onClickCancel?: () => void;
}

export default function ConfirmDialog({
  visible,
  setVisible,
  message,
  onClickAccept,
  onClickCancel,
}: IConfirmDialog) {
  const onHide = (): void => setVisible?.(false);

  return (
    <AlertDialog
      open={visible}
      onOpenChange={(open: boolean) => {
        if (!open) onHide();
      }}
    >
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <FaQuestionCircle className='text-5xl text-zinc-600' />
          <AlertDialogTitle>Confirmación</AlertDialogTitle>
          <AlertDialogDescription>¿{message}?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button
            theme='primary'
            variant='background'
            onClick={() => {
              onClickAccept?.();
              onHide();
            }}
          >
            Sí
          </Button>

          <Button
            theme='secondary'
            variant='outline'
            onClick={() => {
              onClickCancel?.();
              onHide();
            }}
          >
            No
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
