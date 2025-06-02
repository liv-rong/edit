import { Editor, Element as SlateElement, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import {
  LIST_TYPES,
  TEXT_ALIGN_TYPES,
  type AlignType,
  type CustomEditor,
  type CustomElement,
  type CustomElementFormat,
  type CustomElementWithAlign,
  type CustomTextKey,
  type ListType
} from '@/types/custom-types'

export const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  // 保存当前选区

  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }

  if (editor.selection) {
    ReactEditor.focus(editor)
    Transforms.select(editor, editor.selection)
  }
}

export const isAlignElement = (element: CustomElement): element is CustomElementWithAlign => {
  return 'align' in element
}

export const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: 'type' | 'align' = 'type'
) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === 'align' && isAlignElement(n)) {
            return n.align === format
          }
          return n.type === format
        }
        return false
      }
    })
  )

  return !!match
}

export const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType)
}

export const isAlignType = (format: CustomElementFormat): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType)
}

export const toggleBlock = (editor: CustomEditor, format: CustomElementFormat) => {
  // debugger
  const isActive = isBlockActive(editor, format, isAlignType(format) ? 'align' : 'type')
  const isList = isListType(format)

  console.log(isActive, isList)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true
  })
  let newProperties: Partial<SlateElement>
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format
    }
  }

  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    console.log(block, 'block')
    Transforms.wrapNodes(editor, block)
  }
  if (editor.selection) {
    ReactEditor.focus(editor)
    Transforms.select(editor, editor.selection)
  }
}

// 获取当前激活的块级样式
export const getActiveBlock = (editor: CustomEditor) => {
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

// 获取当前选区激活的样式
export const getActiveStyles = (editor: CustomEditor) => {
  const marks = Editor.marks(editor) || {}
  return Object.keys(marks).filter((key) => marks[key] === true)
}
