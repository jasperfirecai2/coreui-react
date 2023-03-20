import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

import { CBackdrop } from '../backdrop/CBackdrop'
import { CConditionalPortal } from '../conditional-portal'
import { CModalContent } from './CModalContent'
import { CModalDialog } from './CModalDialog'

import { useForkedRef } from '../../hooks'

export interface CModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Align the modal in the center or top of the screen.
   */
  alignment?: 'top' | 'center'
  /**
   * Apply a backdrop on body while modal is open.
   */
  backdrop?: boolean | 'static'
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * @ignore
   */
  duration?: number
  /**
   * Set modal to covers the entire user viewport.
   */
  fullscreen?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Closes the modal when escape key is pressed.
   */
  keyboard?: boolean
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void
  /**
   * Callback fired when the component requests to be closed.
   */
  onClosePrevented?: () => void
  /**
   * Callback fired when the modal is shown, its backdrop is static and a click outside the modal or an escape key press is performed with the keyboard option set to false.
   */
  onShow?: () => void
  /**
   * Generates modal using createPortal.
   */
  portal?: boolean
  /**
   * Create a scrollable modal that allows scrolling the modal body.
   */
  scrollable?: boolean
  /**
   * Size the component small, large, or extra large.
   */
  size?: 'sm' | 'lg' | 'xl'
  /**
   * Remove animation to create modal that simply appear rather than fade in to view.
   */
  transition?: boolean
  /**
   * By default the component is unmounted after close animation, if you want to keep the component mounted set this property to false.
   */
  unmountOnClose?: boolean
  /**
   * Toggle the visibility of modal component.
   */
  visible?: boolean
}

interface ModalContextProps {
  visible?: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export const CModalContext = createContext({} as ModalContextProps)

export const CModal = forwardRef<HTMLDivElement, CModalProps>(
  (
    {
      children,
      alignment,
      backdrop = true,
      className,
      duration = 150,
      fullscreen,
      keyboard = true,
      onClose,
      onClosePrevented,
      onShow,
      portal = true,
      scrollable,
      size,
      transition = true,
      unmountOnClose = true,
      visible,
      ...rest
    },
    ref,
  ) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const modalContentRef = useRef<HTMLDivElement>(null)
    const forkedRef = useForkedRef(ref, modalRef)

    const [_visible, setVisible] = useState(visible)
    const [staticBackdrop, setStaticBackdrop] = useState(false)

    const contextValues = {
      visible: _visible,
      setVisible,
    }

    useEffect(() => {
      setVisible(visible)
    }, [visible])

    useEffect(() => {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('click', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [_visible])

    const handleDismiss = () => {
      if (backdrop === 'static') {
        return setStaticBackdrop(true)
      }

      return onClose && onClose()
    }

    useLayoutEffect(() => {
      onClosePrevented && onClosePrevented()
      setTimeout(() => setStaticBackdrop(false), duration)
    }, [staticBackdrop])

    // Set focus to modal after open
    useLayoutEffect(() => {
      if (_visible) {
        document.body.classList.add('modal-open')

        if (backdrop) {
          document.body.style.overflow = 'hidden'
          document.body.style.paddingRight = '0px'
        }

        setTimeout(
          () => {
            modalRef.current?.focus()
          },
          transition ? duration : 0,
        )
      } else {
        document.body.classList.remove('modal-open')

        if (backdrop) {
          document.body.style.removeProperty('overflow')
          document.body.style.removeProperty('padding-right')
        }
      }
      return () => {
        document.body.classList.remove('modal-open')
        if (backdrop) {
          document.body.style.removeProperty('overflow')
          document.body.style.removeProperty('padding-right')
        }
      }
    }, [_visible])

    const handleClickOutside = (event: Event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as HTMLElement)
      ) {
        handleDismiss()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && keyboard) {
        handleDismiss()
      }
    }

    return (
      <>
        <Transition
          in={_visible}
          mountOnEnter
          nodeRef={modalRef}
          onEnter={onShow}
          onExit={onClose}
          unmountOnExit={unmountOnClose}
          timeout={transition ? duration : 0}
        >
          {(state) => (
            <CConditionalPortal portal={portal}>
              <CModalContext.Provider value={contextValues}>
                <div
                  className={classNames(
                    'modal',
                    {
                      'modal-static': staticBackdrop,
                      fade: transition,
                      show: state === 'entered',
                    },
                    className,
                  )}
                  tabIndex={-1}
                  role="dialog"
                  style={{
                    ...(state !== 'exited' && { display: 'block' }),
                  }}
                  ref={forkedRef}
                >
                  <CModalDialog
                    alignment={alignment}
                    fullscreen={fullscreen}
                    scrollable={scrollable}
                    size={size}
                  >
                    <CModalContent {...rest} ref={modalContentRef}>
                      {children}
                    </CModalContent>
                  </CModalDialog>
                </div>
              </CModalContext.Provider>
            </CConditionalPortal>
          )}
        </Transition>
        {backdrop && (
          <CConditionalPortal portal={portal}>
            <CBackdrop visible={_visible} />
          </CConditionalPortal>
        )}
      </>
    )
  },
)

CModal.propTypes = {
  alignment: PropTypes.oneOf(['top', 'center']),
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf<'static'>(['static'])]),
  children: PropTypes.node,
  className: PropTypes.string,
  duration: PropTypes.number,
  fullscreen: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(['sm', 'md', 'lg', 'xl', 'xxl']),
  ]),
  keyboard: PropTypes.bool,
  onClose: PropTypes.func,
  onClosePrevented: PropTypes.func,
  onShow: PropTypes.func,
  portal: PropTypes.bool,
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
  transition: PropTypes.bool,
  unmountOnClose: PropTypes.bool,
  visible: PropTypes.bool,
}

CModal.displayName = 'CModal'
