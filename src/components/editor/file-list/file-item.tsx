import clsx from 'clsx'
import React from 'react'
import CloseIcon from '@/assets/close.svg?react'

interface Props {
  active?: boolean
  onClick?: () => void
  filename: string
  canDelete?: boolean
  onDelete?: () => void
}

const FileItem: React.FC<Props> = ({canDelete = false, filename, active = false, onClick, onDelete}) => {

  const [value, setValue] = React.useState(filename)
  const [editing, setEditing] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    if (canDelete) {
      setEditing(true)
      setTimeout(() => {
        inputRef?.current?.focus()
      }, 0)
    }
  }

  return (
    <div
      className={clsx('mt-0.5 border-b-2 flex items-center relative flex-shrink-0', active ? 'border-[#0A7EA4]' : 'border-transparent', editing && 'bg-amber-100')}
      onClick={onClick}
    >

      <span
        onDoubleClick={handleDoubleClick}
        style={editing ? {paddingRight: 24} : {}}
        className={clsx('py-2 pl-2 text-sm leading-none min-w-8 min-h-[30px]', active ? 'cursor-text text-[#0A7EA4]' : 'cursor-pointer', editing && 'opacity-0', canDelete ? 'pr-1': 'pr-2')}
      >
        {value}
      </span>
      {canDelete && (
        editing ? (
          <input
            ref={inputRef}
            value={value}
            className={'absolute top-2 left-2 border-none outline-0 text-sm leading-none bg-transparent'}
            onBlur={() => setEditing(false)}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span className={'cursor-pointer pr-1 mt-0.5 hover:text-[#0A7EA4]'} onClick={e => {
            e.stopPropagation()
            onDelete?.()
          }}>
            <CloseIcon/>
          </span>
        )
      )}

    </div>
  )
}

export default FileItem