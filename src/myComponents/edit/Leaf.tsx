import type { RenderLeafProps } from 'slate-react'

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.highlight) {
    children = (
      <span
        style={{ backgroundColor: 'yellow' }}
        {...attributes}
      >
        {children}
      </span>
    )
  }
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>
  }

  return <span {...attributes}>{children}</span>
}

export default Leaf
