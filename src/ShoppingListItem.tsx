import { FC } from 'react'
import { ListItem } from './types'
import { Col, Input, InputNumber, Row } from '@douyinfe/semi-ui'
import { IconShoppingBag } from '@douyinfe/semi-icons'

export interface ShoppingListItemProps {
  item: ListItem
  handleChange: (newItem: ListItem) => void
  index: number
}

const ShoppingListItem: FC<ShoppingListItemProps> = (props) => {
  const { item, handleChange, index } = props

  const handleDescChange = (value: string) => {
    console.log('A', value)
    handleChange({ desc: value, price: item.price })
  }

  const handlePriceChange = (value: string | number) => {
    Number(value) && handleChange({ desc: item.desc, price: Number(value) })
  }

  return (
    <Row gutter={8} style={{ marginBottom: 8 }}>
      <Col span={12}>
        <Input
          size="large"
          prefix={<IconShoppingBag />}
          placeholder={`Prodotto ${index + 1}`}
          defaultValue={item.desc}
          onChange={handleDescChange}
        />
      </Col>
      <Col span={12}>
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
    </Row>
  )
}

export default ShoppingListItem
