import { FIREBASE } from '@/constant/firebase';
import useFirestoreCollection from '@/firebase/services/useFirestoreCollection';
import { IMenuItem } from '@/model/menu';
import MenuItemListItem from './MenuItemListItem';

const MenuItemList = () => {

  const { data: menuItems } = useFirestoreCollection<IMenuItem>(FIREBASE.COLLECTION.MENU_ITEM);

  return (
    <div className="grid grid-cols-3 gap-4 flex flex-grow items-center">
      {menuItems.map((item) => (
        <MenuItemListItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default MenuItemList