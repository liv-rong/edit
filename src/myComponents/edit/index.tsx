import React, { KeyboardEvent, MouseEvent, useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { createEditor, Descendant, Editor, Element as SlateElement, Transforms } from 'slate'
import {
  Editable,
  ReactEditor,
  Slate,
  withReact,
  type RenderElementProps,
  type RenderLeafProps
} from 'slate-react'

import { HOTKEYS, initialValue } from './constants'
import type { CustomEditor, CustomTextKey } from './custom-types'
import renderElement from './Element'
import renderLeaf from './Leaf'

const Edit = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }

  return (
    <div>
      <Slate
        editor={editor}
        initialValue={initialValue}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default Edit
