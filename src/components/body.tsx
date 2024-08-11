import { Allotment } from 'allotment'

import Editor from '@/components/editor'
import Preview from '@/components/preview'

const Body = () => {
  return (
    <div className="h-0 flex-1">
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <Editor/>
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview/>
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}

export default Body