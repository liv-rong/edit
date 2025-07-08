// components/SearchHighlight.tsx
'use client'

import { useCallback } from 'react'
import { Input } from 'antd'
import { Element, Text, type DecoratedRange, type NodeEntry } from 'slate'

interface SearchHighlightProps {
  search: string
  onSearchChange: (value: string) => void
}

export const useSearchHighlight = (search: string) => {
  const decorate = useCallback(
    ([node, path]: NodeEntry): DecoratedRange[] => {
      const ranges: DecoratedRange[] = []
      if (
        search &&
        Element.isElement(node) &&
        Array.isArray(node.children) &&
        node.children.every(Text.isText)
      ) {
        const texts = node.children.map((it) => it.text)
        const str = texts.join('')
        const length = search.length
        let start = str.indexOf(search)
        let index = 0
        let iterated = 0

        while (start !== -1) {
          while (index < texts.length && start >= iterated + texts[index].length) {
            iterated += texts[index].length
            index++
          }

          let offset = start - iterated
          let remaining = length

          while (index < texts.length && remaining > 0) {
            const currentText = texts[index]
            const currentPath = [...path, index]
            const taken = Math.min(remaining, currentText.length - offset)

            ranges.push({
              anchor: { path: currentPath, offset },
              focus: { path: currentPath, offset: offset + taken },
              highlight: true
            })

            remaining -= taken
            if (remaining > 0) {
              iterated += currentText.length
              offset = 0
              index++
            }
          }

          start = str.indexOf(search, start + search.length)
        }
      }
      return ranges
    },
    [search]
  )

  return decorate
}

export const SearchHighlight = ({ search, onSearchChange }: SearchHighlightProps) => {
  return (
    <div className="p-2 ">
      <Input
        placeholder="Search text..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        allowClear
      />
    </div>
  )
}
