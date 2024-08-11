import copy from 'copy-to-clipboard'
import { Toaster, toast } from 'sonner'

import ReactIcon from '@/assets/react.svg?react'
import ShareIcon from '@/assets/share.svg?react'
import DownloadIcon from '@/assets/download.svg?react'
import { downloadFiles } from '@/lib/utils'
import { useContext } from 'react'
import { PlaygroundContext } from '@/context'

// https://data.jsdelivr.com/v1/package/npm/typescript
// https://data.jsdelivr.com/v1/package/resolve/npm/typescript@latest
// https://data.jsdelivr.com/v1/package/resolve/npm/@vue/runtime-dom@latest

const Header = () => {
  const { files } = useContext(PlaygroundContext)
  return (
    <header className="flex-shrink-0 border-b border-gray-200 flex items-center px-4 py-3 text-[#23272f] shadow-[0_0_4px_#00000054]">
      <Toaster richColors position="top-center" />
      <div className="flex items-center gap-2">
        <ReactIcon className={'text-3xl text-[#087ea4]'}/>
        <h1 className={'text-2xl font-medium'}>React Playground</h1>
      </div>
      <div className={'ml-auto flex items-center gap-4 text-xl'}>
        <ShareIcon className='icon-button' onClick={() => {
          copy(window.location.href)
          toast.success('copied to clipboard.')
        }}/>
        <DownloadIcon className='icon-button' onClick={async () => {
          await downloadFiles(files);
          toast.success('download successfully.')
        }}/>
      </div>
    </header>
  )
}

export default Header