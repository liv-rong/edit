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
  const { selection } = editor
  console.log(selection, 'selection')

  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }

  // 恢复选区
  // ReactEditor.focus(editor)
  // Transforms.select(editor, selection)
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
  console.log(newProperties)
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    console.log(block, 'block')
    Transforms.wrapNodes(editor, block)
  }
}

// export const safelyRestoreSelection = (editor: Editor, originalSelection: Range | null) => {
//   if (!originalSelection) return

//   try {
//     // 验证选区路径是否仍然有效
//     const isValid =
//       Editor.hasPath(editor, originalSelection.anchor.path) &&
//       Editor.hasPath(editor, originalSelection.focus.path) &&
//       Point.isAfter(
//         originalSelection.anchor,
//         Editor.start(editor, originalSelection.anchor.path)
//       ) &&
//       Point.isBefore(originalSelection.focus, Editor.end(editor, originalSelection.focus.path))

//     if (isValid) {
//       Transforms.select(editor, originalSelection)
//     } else {
//       // 如果选区无效，尝试找到最近的可用位置
//       const text = Editor.string(editor, originalSelection)
//       const [match] = Editor.nodes(editor, {
//         at: [],
//         match: (n) => Editor.isBlock(editor, n) && Editor.string(editor, [n]).includes(text)
//       })

//       if (match) {
//         const [node, path] = match
//         const start = Editor.start(editor, path)
//         Transforms.select(editor, {
//           anchor: start,
//           focus: Editor.end(editor, path)
//         })
//       }
//     }
//     ReactEditor.focus(editor)
//   } catch (e) {
//     console.warn('Selection restore failed:', e)
//   }
// }
