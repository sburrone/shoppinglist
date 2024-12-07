import { FC, ReactElement } from 'react'
import { Avatar, List, Typography } from '@douyinfe/semi-ui'
import { AvatarColor } from '@douyinfe/semi-ui/lib/es/avatar'
import { IconCart, IconCreditCard, IconDisc, IconPriceTag } from '@douyinfe/semi-icons'

interface OverviewProps {
  total: number
  tickets: number
  change: number
  toNext: number
}

const Overview: FC<OverviewProps> = (props) => {
  const { total, tickets, change, toNext } = props

  const data = [
    <Typography>
      <span style={{ color: 'var(--semi-color-text-2)', fontWeight: 500, marginInlineEnd: 8 }}>Totale</span>
      {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(total)}
    </Typography>,
    <Typography>
      <span style={{ color: 'var(--semi-color-text-2)', fontWeight: 500, marginInlineEnd: 8 }}>Numero buoni</span>
      {tickets}
    </Typography>,
    <Typography>
      <span style={{ color: 'var(--semi-color-text-2)', fontWeight: 500, marginInlineEnd: 8 }}>Resto</span>
      {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(change)}
    </Typography>,
    <Typography>
      <span style={{ color: 'var(--semi-color-text-2)', fontWeight: 500, marginInlineEnd: 8 }}>Al prossimo</span>
      {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(toNext)}
    </Typography>,
  ]

  const avatars: { color: AvatarColor; label: string | ReactElement }[] = [
    {
      color: 'purple',
      label: <IconCart />,
    },
    {
      color: 'blue',
      label: <IconCreditCard />,
    },
    {
      color: 'green',
      label: <IconPriceTag />,
    },
    {
      color: 'pink',
      label: <IconDisc />,
    },
  ]

  return (
    <List
      dataSource={data}
      size="small"
      style={{ width: 300, margin: 'auto' }}
      renderItem={(item, index) => (
        <List.Item
          header={
            <Avatar size="small" color={avatars[index].color}>
              {avatars[index].label}
            </Avatar>
          }
        >
          {item}
        </List.Item>
      )}
    />
  )
}

export default Overview
