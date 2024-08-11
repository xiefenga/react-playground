import { useContext, useEffect, useState } from 'react'
import iframeRaw from '@/template/iframe.html?raw'
import { PlaygroundContext } from '@/context'
import { IMPORT_MAP_FILE_NAME } from '@/lib/files'
import { compile } from '@/lib/compiler'

interface MessageData {
  data: {
    type: string
    message: string
  }
}

export default function Preview() {
  const getIframeUrl = () => {
    const res = iframeRaw.replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${
        files[IMPORT_MAP_FILE_NAME].value
      }</script>`
    ).replace(
      '<script type="module" id="appSrc"></script>',
      `<script type="module" id="appSrc">${compiledCode}</script>`,
    )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  const { files} = useContext(PlaygroundContext)
  const [compiledCode, setCompiledCode] = useState('')
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

  useEffect(() => {
    const res = compile(files);
    setCompiledCode(res);
  }, [files]);

  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  const [error, setError] = useState('')

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data
    if (type === 'ERROR') {
      setError(message)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div className={'h-full'}>
      {error && (
        <div
          className={'absolute whitespace-pre-wrap bottom-2 inset-x-2 py-2 px-4 border-2 rounded-md border-[#f56c6c] text-[#f56c6c] max-h-32 overflow-auto'}>
          {error}
        </div>
      )}
      <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
        }}
      />
    </div>
  )
}
