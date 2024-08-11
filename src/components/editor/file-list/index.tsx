import invariant from 'tiny-invariant'
import { useContext, useEffect, useRef, useState } from 'react'

import FileItem from './file-item'
import { PlaygroundContext } from '@/context'
import { CAN_NOT_DELETE_FilES, ENTRY_FILE_NAME } from '@/lib/files'

const FileList = () => {
  const {files, setSelectedFileName, selectedFileName, removeFile, addFile} = useContext(PlaygroundContext)
  const [tabs, setTabs] = useState([''])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className={'flex flex-shrink-0 border-b border-[#ddd] overflow-hidden'}>
      <div ref={ref} className={'overflow-auto scrollbar-none'} onWheel={e => {
        invariant(ref.current)
        ref.current.scrollLeft += e.deltaX === 0 ? e.deltaY : e.deltaX
      }}>
        <div className={'flex select-none items-center font-medium'}>
          {tabs.map((item) => (
            <FileItem
              key={item}
              filename={item}
              active={selectedFileName === item}
              onClick={() => {
                setSelectedFileName(item)
              }}
              canDelete={!CAN_NOT_DELETE_FilES.includes(item)}
              onDelete={() => {
                removeFile(item)
                if (item === selectedFileName) {
                  setSelectedFileName(ENTRY_FILE_NAME)
                }
              }}
            />
          ))}
          <button
            className={'px-3 h-full flex justify-center items-center hover:text-[#0A7EA4] transition-colors duration-200'}
            onClick={() => {
              const newFileName = 'Comp' + Math.random().toString().slice(2, 8) + '.tsx'
              addFile(newFileName)
              setSelectedFileName(newFileName)
              // setCreating(true)
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileList