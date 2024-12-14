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

  const handleDelete = (id: string) => {
    setList(list.filter((el) => el.id !== id))
  }

  const addItem = () => {
    setList(list.concat({ id: crypto.randomUUID() }))
  }

  return (
    <>
      <div className="grid" style={{ maxWidth: 'calc(100vw - 20px)' }}>
        {list.map((item, index) => {
          return (
            <ShoppingListItem
              key={item.id}
              item={item}
              handleChange={(newItem) => handleChange(newItem, index)}
              index={index}
              handleDelete={() => handleDelete(item.id)}
            />
          )
        })}
      </div>
      <Button style={{ width: 200 }} onClick={addItem}>
        Aggiungi
      </Button>
    </>
  )
}

export default ShoppingList
