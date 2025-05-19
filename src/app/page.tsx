'use client'
import React, { useCallback, useState } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'
import { Editor, Transforms, Element, Node, BaseEditor } from 'slate'
import { RenderElementProps } from 'slate-react'
import { ReactEditor } from 'slate-react'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

type CustomElement = {
  type: 'paragraph' | 'code'
  children: CustomText[]
}

type CustomText = {
  text: string
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
] as CustomElement[]

const CodeElement = (props: {
  attributes: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLPreElement> &
    React.HTMLAttributes<HTMLPreElement>
  children:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | React.ReactPortal
        | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | null
        | undefined
      >
    | null
    | undefined
}) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = (props: {
  attributes: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLParagraphElement> &
    React.HTMLAttributes<HTMLParagraphElement>
  children:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | React.ReactPortal
        | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | null
        | undefined
      >
    | null
    | undefined
}) => {
  return <p {...props.attributes}>{props.children}</p>
}

const App = () => {
  const [editor] = useState(() => withReact(createEditor()))
  // Render the Slate context.

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  return (
    <div>
      <Slate
        editor={editor}
        initialValue={initialValue}
      >
        <Editable
          renderElement={renderElement}
          onKeyDown={(event) => {
            console.log(event.key)
            if (event.key === 'a' && event.ctrlKey) {
              // Prevent the "`" from being inserted by default.
              event.preventDefault()
              console.log(' console.log(event.key)')
              // Otherwise, set the currently selected blocks type to "code".
              Transforms.setNodes(editor, { type: 'code' } as Partial<Node>, {
                match: (n) => Element.isElement(n) && Editor.isBlock(editor, n)
              })
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default App
