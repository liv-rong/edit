import { BaseRange } from 'slate'

import { CustomEditor, CustomElement, CustomText } from './custom-types'

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
    Range: BaseRange & {
      [key: string]: unknown
    }
  }
}
