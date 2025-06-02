import { IcRoundCode, LineHeightIcon, QuoteIcon, TableIcon } from '@/assets/svg'
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'

export const operateArr = [
  {
    title: '粗体',
    icon: <BoldOutlined />,
    operate: 'bold',
    type: 'style'
  },
  {
    title: '斜体',
    icon: <ItalicOutlined />,
    operate: 'italic',
    type: 'style'
  },
  {
    title: '下划线',
    icon: <UnderlineOutlined />,
    operate: 'underline',
    type: 'style'
  },
  {
    title: '删除线',
    icon: <StrikethroughOutlined />,
    operate: 'strikethrough',
    type: 'style'
  },
  {
    title: '代码',
    icon: <IcRoundCode />,
    operate: 'code',
    type: 'style'
  },
  {
    title: '引用',
    icon: <QuoteIcon />,
    operate: 'block-quote',
    type: 'block'
  },
  {
    title: '有序列表',
    icon: <OrderedListOutlined />,
    operate: 'numbered-list',
    type: 'block'
  },
  {
    title: '无序列表',
    icon: <UnorderedListOutlined />,
    operate: 'bulleted-list',
    type: 'block'
  },
  {
    title: '左对齐',
    icon: <AlignLeftOutlined />,
    operate: 'left',
    type: 'block'
  },
  {
    title: '居中对齐',
    icon: <AlignCenterOutlined />,
    operate: 'center',
    type: 'block'
  },
  {
    title: '右边对齐',
    icon: <AlignRightOutlined />,
    operate: 'right',
    type: 'block'
  },
  {
    title: '行高',
    icon: <LineHeightIcon />
  },
  {
    title: '表格',
    icon: <TableIcon />,
    operate: 'table',
    type: 'block'
  }
]
