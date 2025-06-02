import React, { KeyboardEvent, useState } from 'react'
import Header from '@/myComponents/header/index'
import isHotkey from 'is-hotkey'
import { createEditor, Editor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

import type { CustomEditor, CustomTextKey } from '@/types/custom-types'

import { HOTKEYS, initialValue } from './constants'
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
        <Header editor={editor} />
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
