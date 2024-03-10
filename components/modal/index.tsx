// props 설명
// children : 자식요소
// isOpen, setIsOpen : 모달창을 열고 닫는 useState 세트
// headerTitle : 모달창의 header 부분에 오는 text를 정의
// height : 모달창의 높이 커스터마이징
// width : 모달창의 넓이 커스터마이징
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import styles from '../modal/Modal.module.scss';
import { GrFormClose } from 'react-icons/gr';

interface modalType {
  fade?: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  headerTitle?: string;
  headerBorderBottom: boolean;
  height: string;
  width: string;
  bodyTextAlign: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
  bodyPaddingCustom?: boolean;
  children?: React.ReactNode;
}

const Modal = (
  {
    children,
    fade = false,
    isOpen,
    setIsOpen,
    headerTitle,
    headerBorderBottom = true,
    height,
    width,
    bodyPaddingCustom = false,
    bodyTextAlign = 'left',
  }: modalType,
  ref: React.Ref<unknown> | undefined,
) => {
  const close = useCallback(() => setIsOpen(false), []);
  let modalRoot: any;

  // const modalRoot = document.getElementById('modal_root') as HTMLDivElement;
  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close, setIsOpen],
  );

  const handleEscape = useCallback(
    (event: any) => {
      if (event.keyCode === 27) close();
    },
    [close],
  );

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false);

    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  useEffect(() => {
    if (process.browser) {
      modalRoot = document.querySelector('#modal') as HTMLBodyElement;
    }
    if (isOpen) {
      document.body.classList.add('modal_open');
    } else {
      document.body.classList.remove('modal_open');
    }
  }, [isOpen]);

  return (
    <>
      {isOpen &&
        createPortal(
          <>
            <div className={styles.ly_popover}>
              {/* 모달창 바깥 영역 클릭 시 닫히고 싶게 할때
              <div className={styles.ly_popover_overlay} onClick={close} /> 
              */}
              <div className={styles.ly_popover_overlay} />
              <div className={styles.modal_wrap} style={{ height: `${height}px`, width: `${width}px` }}>
                <div className={styles.modal_area}>
                  <div className={styles.modal_area__header + (headerBorderBottom ? '' : ' border-bottom-none')}>
                    <p>{headerTitle && headerTitle}</p>
                    <button onClick={close}>
                      <span>
                        <GrFormClose />
                      </span>
                    </button>
                  </div>
                  <div
                    className={bodyPaddingCustom == false ? styles.modal_area__body : 'modal_area__body'}
                    style={{ textAlign: `${bodyTextAlign}` }}
                  >
                    {children && children}
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.querySelector('#modal_root') as HTMLDivElement,
        )}
    </>
  );
};

export default forwardRef(Modal);
