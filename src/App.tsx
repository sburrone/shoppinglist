import { useEffect, useState } from 'react'
import { ListItem } from './types'
import Delete from './Delete'
import { Layout, Typography } from '@douyinfe/semi-ui'
import ShoppingList from './ShoppingList'
import Overview from './Overview'

export const TICKET_AMOUNT = 8

const App = () => {
  const [list, setList] = useState<ListItem[]>([])
  const [total, setTotal] = useState(0)

  // ColorMode
  const switchMode = (e) => {
    const body = document.body
    if (e.matches) {
      body.classList.remove('semi-always-light')
      body.classList.add('semi-always-dark')
      if (!body.hasAttribute('theme-mode')) {
        body.setAttribute('theme-mode', 'dark')
      }
    } else {
      body.classList.remove('semi-always-dark')
      body.classList.add('semi-always-light')
      if (body.hasAttribute('theme-mode')) {
        body.removeAttribute('theme-mode')
      }
    }
  }

  //Startup
  useEffect(() => {
    const raw = localStorage.getItem('list')
    if (raw) {
      const list = JSON.parse(raw) as ListItem[]
      setList(list)
    }

    document.body.style.backgroundColor = 'var(--semi-color-bg-0)'
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.addEventListener('change', switchMode)
    switchMode(mql)

    return () => {
      mql.removeEventListener('change', switchMode)
    }
  }, [])

  const handleReset = () => {
    setList([])
    localStorage.removeItem('list')
    setTotal(0)
  }

  const changeList = (newList: ListItem[]) => {
    const prices = newList.map((el) => el.price || 0)
    const newTotal = prices.reduce((acc, val) => {
      return acc + val
    }, 0)
    setTotal(newTotal)
    setList(newList)
    localStorage.setItem('list', JSON.stringify(newList))
  }

  const tickets = Math.floor(total / TICKET_AMOUNT) || 0
  const change = total % tickets || 0
  const toNext = TICKET_AMOUNT - change || 0

  return (
    <Layout>
      <Layout.Header style={{ padding: 8, textAlign: 'center' }}>
        <Typography.Title>Lista della spesa</Typography.Title>
        <Overview toNext={toNext} tickets={tickets} total={total} change={change} />
      </Layout.Header>
      <Layout.Content style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 16 }}>
        <Delete handleReset={handleReset} />
        <ShoppingList list={list} setList={changeList} />
      </Layout.Content>
    </Layout>
  )
}

export default App
