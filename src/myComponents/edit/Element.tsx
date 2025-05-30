import type { RenderElementProps } from 'slate-react'

import type { AlignType, CustomElement, CustomElementWithAlign } from './custom-types'

const isAlignElement = (element: CustomElement): element is CustomElementWithAlign => {
  return 'align' in element
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style: React.CSSProperties = {}
  if (isAlignElement(element)) {
    style.textAlign = element.align as AlignType
  }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          style={style}
          {...attributes}
        >
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul
          style={style}
          {...attributes}
        >
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1
          style={style}
          {...attributes}
        >
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2
          style={style}
          {...attributes}
        >
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li
          style={style}
          {...attributes}
        >
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol
          style={style}
          {...attributes}
        >
          {children}
        </ol>
      )
    default:
      return (
        <p
          style={style}
          {...attributes}
        >
          {children}
        </p>
      )
  }
}

export default Element
