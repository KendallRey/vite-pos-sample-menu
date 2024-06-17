import MuiChip from '@/components/chip/Chip'
import { parseToMoney, formatToCount } from '@/components/helper/component'
import { FIELDS } from '@/constant/config'
import { IMenuItem } from '@/model/menu'
import { Card, CardActionArea, CardMedia, CardContent, Stack, Typography, CardActions } from '@mui/material'
import React from 'react'

type IMenuItemListItem = {
  item: IMenuItem;
}

const MenuItemListItem: React.FC<IMenuItemListItem> = ({item}) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" className="max-w-[240px] mx-auto p-4" image="vite.svg" alt="Product Image" />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
            <Typography gutterBottom variant="h5" component="div">
              {item.name || FIELDS.EMPTY_IMPORTANT}
            </Typography>
            <Typography gutterBottom variant="h6" component="div" className="text-end">
              {parseToMoney(item.price)}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {item.description || FIELDS.EMPTY}
            </Typography>
            <Typography variant="subtitle2" className="text-end">
              Stock: {formatToCount(item.stock)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className="flex flex-wrap gap-2">
          {item.categories?.map((item, i) => <MuiChip key={`${item}-${i}`} label={item} color="primary" />)}
        </div>
      </CardActions>
    </Card>
  )
}

export default MenuItemListItem