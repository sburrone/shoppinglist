import { FC } from 'react'
import { ListItem } from './types'
import { Button, Col, Input, InputNumber, Row } from '@douyinfe/semi-ui'
import { IconClose, IconShoppingBag } from '@douyinfe/semi-icons'

export interface ShoppingListItemProps {
  item: ListItem
  handleChange: (newItem: ListItem) => void
  index: number
  handleDelete: () => void
}

const ShoppingListItem: FC<ShoppingListItemProps> = (props) => {
  const { item, handleChange, index, handleDelete } = props

  const handleDescChange = (value: string) => {
    handleChange({ ...item, desc: value || '' })
  }

  const handlePriceChange = (value: string | number) => {
    Number(value) && handleChange({ ...item, price: Number(value) || 0 })
  }

  const handleQtyChange = (value: string | number) => {
    Number(value) && handleChange({ ...item, qty: Number(value) || 1 })
  }

  return (
    <Row gutter={8} type="flex" justify="center" style={{ marginBottom: 8 }}>
      <Col span={10}>
        <Input
          size="large"
          prefix={<IconShoppingBag />}
          placeholder={`Prodotto ${index + 1}`}
          defaultValue={item.desc}
          onChange={handleDescChange}
        />
      </Col>
      <Col span={5}>
        <InputNumber
          hideButtons
          size="large"
          placeholder={'Num.'}
          precision={0}
          defaultValue={item.qty}
          onChange={handleQtyChange}
          parser={(value) => value.replace(/[^0-9.]/g, '')}
        />
      </Col>
      <Col span={7}>
        <InputNumber
          hideButtons
          size="large"
          placeholder={'Prezzo'}
          precision={2}
          defaultValue={item.price}
          onChange={handlePriceChange}
          prefix={'€'}
          parser={(value) => value.replace(',', '.').replace(/[^0-9.]/g, '')}
        />
      </Col>
      <Col span={2}>
        <Button
          type="warning"
          icon={<IconClose />}
          aria-label="Cancella"
          onClick={handleDelete}
          style={{ minHeight: '100%', maxWidth: '100%' }}
        />
      </Col>
    </Row>
  )
}

export default ShoppingListItem
