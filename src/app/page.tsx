'use client'

import Edit from '@/myComponents/edit/index'
import Header from '@/myComponents/header/index'

const App = () => {
  return (
    <div className="h-[100vh] flex w-full flex-col items-center justify-center">
      <div className="flex h-full  w-[800px] flex-col border-x   border-gray-200  ">
        <Header />
        <Edit />
      </div>
    </div>
  )
}

export default App
