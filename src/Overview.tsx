import { FC } from 'react'
import { Avatar, Col, Row, Typography } from '@douyinfe/semi-ui'
import { IconCart, IconCreditCard, IconDisc, IconPriceTag } from '@douyinfe/semi-icons'
import { TICKET_AMOUNT } from './App'

interface OverviewProps {
  total: number
}

const Overview: FC<OverviewProps> = (props) => {
  const { total } = props

  const tickets = Math.floor(total / TICKET_AMOUNT) || 0
  const change = total % (tickets * TICKET_AMOUNT) || 0
  const toNext = TICKET_AMOUNT - change || 0

  return (
    <div className="grid">
      <Row gutter={8} style={{ margin: '8px 0' }}>
        <Col span={12}>
          <Avatar size="small" color={'purple'}>
            <IconCart />
          </Avatar>
          <Typography>
            <span style={{ color: 'var(--semi-color-text-2)', fontWeight: 500, marginInlineEnd: 8 }}>Totale</span>
            {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(total)}
          </Typography>
        </Col>
        <Col span={12}>
          <Avatar size="small" color={'blue'}>
            <IconCreditCard />
          </Avatar>
          <Typography>
            <span style={{ color: 'var(--semi-color-text-2)', fontWeight: 500, marginInlineEnd: 8 }}>Numero buoni</span>
            {tickets}
          </Typography>
        </Col>
      </Row>

      <Row gutter={8} style={{ margin: '8px 0' }}>
        <Col span={12}>
          <Avatar size="small" color={'green'}>
            <IconPriceTag />
          </Avatar>
          <Typography>
            <span style={{ color: 'var(--semi-color-text-2)', fontWeight: 500, marginInlineEnd: 8 }}>Resto</span>
            {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(change)}
          </Typography>
        </Col>
        <Col span={12}>
          <Avatar size="small" color={'pink'}>
            <IconDisc />
          </Avatar>
          <Typography>
            <span style={{ color: 'var(--semi-color-text-2)', fontWeight: 500, marginInlineEnd: 8 }}>Al prossimo</span>
            {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(toNext)}
          </Typography>
        </Col>
      </Row>
    </div>
  )
}

export default Overview
