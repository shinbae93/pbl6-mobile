import * as React from 'react'
import { Paragraph, Dialog, Portal } from 'react-native-paper'

const Error = ({ content }) => {
  const [visible, setVisible] = React.useState(false)

  const hideDialog = () => setVisible(false)

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>{content}</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
  )
}

export default Error
