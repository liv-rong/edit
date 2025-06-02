import React, { KeyboardEvent, useCallback, useMemo, useState } from 'react'
import Header from '@/myComponents/header/index'
import isHotkey from 'is-hotkey'
import { createEditor, Editor } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  Slate,
  withReact,
  type RenderElementProps,
  type RenderLeafProps
} from 'slate-react'

import type { CustomEditor, CustomTextKey } from '@/types/custom-types'

import { HOTKEYS, initialValue } from './constants'
import RenderElement from './Element'
import RenderLeaf from './Leaf'

const Edit = () => {
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

  const renderElement = useCallback((props: RenderElementProps) => <RenderElement {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <RenderLeaf {...props} />, [])

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <div>
      <Slate
        editor={editor}
        initialValue={initialValue}
      >
        <Header />
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
