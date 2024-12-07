import { Button } from '@douyinfe/semi-ui'
import { FC, useState } from 'react'

export interface DeleteProps {
  handleReset: () => void
}

const Delete: FC<DeleteProps> = (props) => {
  const { handleReset } = props

  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <>
      {showConfirmation ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button style={{ width: '96px' }} type="tertiary" onClick={() => setShowConfirmation(false)}>
            Annulla
          </Button>
          <Button
            style={{ width: '96px' }}
            onClick={() => {
              handleReset()
              setShowConfirmation(false)
            }}
          >
            Cancella
          </Button>
        </div>
      ) : (
        <Button type="warning" style={{ width: '200px' }} onClick={() => setShowConfirmation(true)}>
          Cancella tutto
        </Button>
      )}
    </>
  )
}

export default Delete
