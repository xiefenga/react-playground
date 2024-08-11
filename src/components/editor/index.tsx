import { useContext } from 'react'
import { debounce } from 'lodash-es'

import CodeEitor from './code-editor'
import { PlaygroundContext } from '@/context'
import FileList from '@/components/editor/file-list'

const Editor = () => {

  const { files, selectedFileName, setFiles } = useContext(PlaygroundContext)

  const file = files[selectedFileName];

  return (
    <div className='flex flex-col h-full'>
      <FileList />
      <div className={'h-0 flex-1'}>
        <CodeEitor file={file} onChange={debounce((value) => {
          if (value ) {
            file.value = value
            setFiles({ ...files })
          }
        }, 500)}/>
      </div>
    </div>
  )

}

export default Editor