import { FC } from 'react'
import { ListItem } from './types'
import { Button } from '@douyinfe/semi-ui'
import ShoppingListItem from './ShoppingListItem'
import _ from 'lodash'

export interface ShoppingListProps {
  list: ListItem[]
  setList: (newList: ListItem[]) => void
}

const ShoppingList: FC<ShoppingListProps> = (props) => {
  const { list, setList } = props

  const handleChange = (item: ListItem, index: number) => {
    const newList = _.cloneDeep(list)
    newList[index] = item
    setList(newList)
  }

  const addItem = () => {
    setList(list.concat({}))
  }

  return (
    <>
      <div className="grid">
        {list.map((item, index) => (
          <ShoppingListItem
            key={index}
            item={item}
            handleChange={(newItem) => handleChange(newItem, index)}
            index={index}
          />
        ))}
      </div>
      <Button style={{ width: 200 }} onClick={addItem}>
        Aggiungi
      </Button>
    </>
  )
}

export default ShoppingList
