'use client'

import {
  forwardRef,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode
} from 'react'
import { Button } from 'antd'
import classNames from 'classnames'
import ReactDOM from 'react-dom'
import { Range } from 'slate'
import { useFocused, useSlate } from 'slate-react'

import type { CustomElementFormat, CustomTextKey } from '@/types/custom-types'

import { operateArr } from '../header/constants'
import { getActiveBlock, getActiveStyles, toggleBlock, toggleMark } from '../header/editmy'

interface BaseProps {
  children?: ReactNode
  onMouseDown?: (e: ReactMouseEvent<HTMLDivElement>) => void
}

interface MenuProps extends BaseProps {
  className?: string
}

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={classNames(
      className,
      'absolute z-50  bg-white border border-gray-100 rounded-md   shadow-lg transition-opacity duration-300 opacity-0 pointer-events-none',
      'hover:opacity-100' // 添加hover效果
    )}
    style={{
      top: '-10000px',
      left: '-10000px'
    }}
  />
))

Menu.displayName = 'Menu'

const Toolbar = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const editor = useSlate()
  const inFocus = useFocused()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { selection } = editor

    // 基础可见性控制
    if (!selection || !inFocus) {
      el.style.opacity = '0'
      el.style.pointerEvents = 'none'
      return
    }

    // 折叠选区处理
    if (Range.isCollapsed(selection)) {
      el.style.opacity = '0.5'
      el.style.pointerEvents = 'none'
      return
    }

    // 计算位置
    try {
      const domSelection = window.getSelection()
      if (!domSelection || domSelection.rangeCount === 0) return

      const domRange = domSelection.getRangeAt(0)
      const rect = domRange.getBoundingClientRect()

      Object.assign(el.style, {
        opacity: '1',
        pointerEvents: 'auto',
        top: `${rect.top + window.pageYOffset - el.offsetHeight - 4}px`,
        left: `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`,
        transform: 'translateY(-100%)'
      })
    } catch (e) {
      console.error('Position calculation failed:', e)
    }
  }, [editor, editor.selection, inFocus])

  const classNamesMy = (operate: string | undefined, type: string = 'style') => {
    if (!operate) return ''

    if (type === 'style') {
      const activeStyles = getActiveStyles(editor)
      return activeStyles.includes(operate) ? '!bg-gray-200' : ''
    } else {
      const activeBlock = getActiveBlock(editor)
      return activeBlock === operate ? '!bg-gray-200' : ''
    }
  }

  return (
    <>
      <Portal>
        <Menu
          ref={ref}
          onMouseDown={(e: ReactMouseEvent<HTMLDivElement>) => {
            // prevent toolbar from taking focus away from editor
            e.preventDefault()
          }}
        >
          {operateArr.map((item, index) => {
            return (
              <Button
                type="text"
                key={index}
                icon={item.icon}
                className={classNamesMy(item.operate, item.type)}
                // style={{
                //   backgroundColor: 'red'
                // }}
                onClick={(event) => {
                  event.preventDefault()
                  if (item.type === 'style') {
                    toggleMark(editor, item.operate as CustomTextKey)
                  } else {
                    toggleBlock(editor, item.operate as CustomElementFormat)
                  }
                }}
              />
            )
          })}
        </Menu>
      </Portal>
    </>
  )
}

export default Toolbar
