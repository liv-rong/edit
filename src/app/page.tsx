'use client'
import React, { useCallback, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'
import { Editor, Transforms, Element, Node, BaseEditor, Descendant } from 'slate'
import { RenderElementProps, RenderLeafProps } from 'slate-react'
import { ReactEditor } from 'slate-react'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

type CustomElement = {
  type: 'paragraph' | 'code'
  children: CustomText[]
}

type CustomText = {
  text: string
  bold?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const App = () => {
  const [editor] = useState(() => withReact(createEditor()))

  // Define a serializing function that takes a value and returns a string.
  const serialize = (value: Descendant[]): string => {
    return (
      value
        // Return the string content of each paragraph in the value's children.
        .map((n: Descendant) => Node.string(n))
        // Join them all with line breaks denoting paragraphs.
        .join('\n')
    )
  }

  // Define a deserializing function that takes a string and returns a value.
  const deserialize = (string: string): Descendant[] => {
    // Return a value array of children derived by splitting the string.
    return string.split('\n').map((line: string) => {
      return {
        type: 'paragraph',
        children: [{ text: line }]
      }
    })
  }

  const initialValue = useMemo(() => {
    const savedContent = localStorage.getItem('content')
    return savedContent
      ? deserialize(savedContent)
      : ([
          {
            type: 'paragraph' as const,
            children: [{ text: '开始编辑...' }]
          }
        ] as CustomElement[])
  }, [])

  return (
    <div>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value: Descendant[]) => {
          const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type)
          if (isAstChange) {
            // Serialize the value and save the string value to Local Storage.
            localStorage.setItem('content', serialize(value))
          }
        }}
      >
        <Editable />
      </Slate>
    </div>
  )
}

export default App
