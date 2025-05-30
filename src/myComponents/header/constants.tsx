import { IcRoundCode } from '@/assets/svg'
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined
} from '@ant-design/icons'

export const operateArr = [
  {
    title: '粗体',
    icon: <BoldOutlined />,
    operate: 'bold'
  },
  {
    title: '斜体',
    icon: <ItalicOutlined />,
    operate: 'italic'
  },
  {
    title: '下划线',
    icon: <UnderlineOutlined />,
    operate: 'UnderlineOutlined'
  },
  {
    title: '删除线',
    icon: <StrikethroughOutlined />,
    operate: 'StrikethroughOutlined'
  },
  {
    title: '代码',
    icon: <IcRoundCode />,
    operate: 'code'
  }
]
