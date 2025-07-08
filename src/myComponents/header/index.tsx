import { Heading } from '@/assets/svg'
// import { toggleBlock, toggleMark } from '@/myComponents/header/editmy'
import { Button, Dropdown, Tooltip, type MenuProps } from 'antd'
import classNames from 'classnames'
import { useSlate } from 'slate-react'

import type { CustomElementFormat, CustomTextKey } from '@/types/custom-types'

import { operateArr } from './constants'
import { getActiveBlock, getActiveStyles, toggleBlock, toggleMark } from './editmy'

const Header = () => {
  const editor = useSlate()

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
      const activeStyles = getActiveStyles(editor)
      return activeStyles.includes(operate) ? '!bg-gray-200' : ''
    } else {
      const activeBlock = getActiveBlock(editor)
      return activeBlock === operate ? '!bg-gray-200' : ''
    }
  }

  return (
    <div className="w-full h-12  px-2 flex gap-2 items-center justify-start">
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
