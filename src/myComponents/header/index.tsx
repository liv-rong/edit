import { Heading } from '@/assets/svg'
// import { toggleBlock, toggleMark } from '@/myComponents/header/editmy'
import { Button, Dropdown, Tooltip, type MenuProps } from 'antd'
import classNames from 'classnames'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'

import type { CustomElementFormat, CustomTextKey } from '@/types/custom-types'

import { operateArr } from './constants'
import { isBlockActive, toggleBlock, toggleMark } from './editmy'

const Header = () => {
  const editor = useSlate()

  // 获取当前选区激活的样式
  const getActiveStyles = () => {
    const marks = Editor.marks(editor) || {}
    return Object.keys(marks).filter((key) => marks[key] === true)
  }

  // 获取当前激活的块级样式
  const getActiveBlock = () => {
    for (const format of [
      'heading-one',
      'heading-two',
      'heading-three',
      'heading-four',
      'heading-five',
      'heading-six',
      'paragraph',
      'block-quote',
      'numbered-list',
      'bulleted-list',
      'left',
      'center',
      'right'
    ]) {
      if (isBlockActive(editor, format as CustomElementFormat)) {
        return format
      }
    }
    return null
  }

  const items: MenuProps['items'] = [
    {
      key: 'heading-one',
      label: (
        <div
        // className={classNames({
        //   '!bg-red-200': getActiveBlock()?.startsWith('heading')
        // })}
        >
          H1一级标题
        </div>
      ),
      onClick: () => {
        toggleBlock(editor, 'heading-one' as CustomElementFormat)
      }
    },
    {
      key: 'heading-two',
      label: 'H2二级标题',
      onClick: () => {
        toggleBlock(editor, 'heading-two' as CustomElementFormat)
      }
    },
    {
      key: 'heading-three',
      label: 'H3三级标题',
      onClick: () => {
        toggleBlock(editor, 'heading-three' as CustomElementFormat)
      }
    },
    {
      key: 'heading-four',
      label: 'H4四级标题',
      onClick: () => {
        toggleBlock(editor, 'heading-four' as CustomElementFormat)
      }
    },
    {
      key: 'heading-five',
      label: 'H5五级标题',
      onClick: () => {
        toggleBlock(editor, 'heading-five' as CustomElementFormat)
      }
    },
    {
      key: 'heading-six',
      label: 'H6六级标题',
      onClick: () => {
        toggleBlock(editor, 'heading-six' as CustomElementFormat)
      }
    }
  ]

  const classNamesMy = (operate: string | undefined, type: string = 'style') => {
    if (!operate) return ''

    if (type === 'style') {
      const activeStyles = getActiveStyles()
      return activeStyles.includes(operate) ? '!bg-gray-200' : ''
    } else {
      const activeBlock = getActiveBlock()
      return activeBlock === operate ? '!bg-gray-200' : ''
    }
  }

  return (
    <div className="w-full h-12 border-b border-gray-200 px-2 flex gap-2 items-center justify-start">
      <Dropdown menu={{ items }}>
        <Button
          type="text"
          icon={<Heading className="text-base" />}
        />
      </Dropdown>
      {operateArr.map((item, index) => {
        return (
          <Tooltip
            key={index}
            title={item.title}
          >
            <Button
              type="text"
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
          </Tooltip>
        )
      })}
    </div>
  )
}

export default Header
