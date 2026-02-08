import {useEffect, useState} from 'react'
import {ListItem} from './types'
import Delete from './Delete'
import {Button, Layout, Typography} from '@douyinfe/semi-ui'
import ShoppingList from './ShoppingList'
import Overview from './Overview'

const App = () => {
    const [list, setList] = useState<ListItem[]>([])
    const [total, setTotal] = useState(0)
    const [ticketAmount, setTicketAmount] = useState(8)

    // ColorMode
    const switchMode = (matches: boolean) => {
        const body = document.body
        if (matches) {
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
            //updateTotal(list)
        }

        const ticketAmount = localStorage.getItem('ticketAmount')? Number(localStorage.getItem('ticketAmount')) : 8
        setTicketAmount(ticketAmount)

        document.body.style.backgroundColor = 'var(--semi-color-bg-0)'
        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        mql.addEventListener('change', (e) => switchMode(e.matches))
        switchMode(mql.matches)

        return () => {
            mql.removeEventListener('change', (e) => switchMode(e.matches))
        }
    }, [])

    const handleReset = () => {
        setList([])
        localStorage.removeItem('list')
        setTotal(0)
    }

    const updateTotal = (list: ListItem[]) => {
        const prices = list.map((el) => ({price: el.price || 0, qty: el.qty || 1}))
        const newTotal: number = prices.reduce((acc, val) => {
            return acc + val.price * val.qty
        }, 0)
        setTotal(newTotal)
    }

    const changeList = (newList: ListItem[]) => {
        updateTotal(newList)
        setList(newList)
        localStorage.setItem('list', JSON.stringify(newList))
    }

    const changeTicketAmount = () => {
        localStorage.setItem('ticketAmount', ticketAmount === 8 ? "10" : "8")
        setTicketAmount(ticketAmount === 8 ? 10 : 8)
    }

    return (
        <Layout>
            <Layout.Header style={{padding: 8, textAlign: 'center'}}>
                <span style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                    justifyContent: "center"
                }}><Typography.Title>Lista della spesa</Typography.Title><Button onClick={changeTicketAmount} type={"primary"}>{ticketAmount}</Button></span>
                <Overview total={total} ticketAmount={ticketAmount}/>
            </Layout.Header>
            <Layout.Content style={{display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 16}}>
                <Delete handleReset={handleReset}/>
                <ShoppingList list={list} setList={changeList}/>
            </Layout.Content>
        </Layout>
    )
}

export default App
