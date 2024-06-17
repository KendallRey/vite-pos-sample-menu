import PageContainer from "@/components/container/Page";
import MenuPageActions from "./ui/MenuPageActions";
import CreateMenuItemDialog from "./ui/CreateMenuItemDialog";
import MenuItemList from "./ui/MenuItemList";

export const MenuPage = () => {

  return (
    <>
      <PageContainer title="Menu">
        <MenuPageActions />
        <MenuItemList/>
      </PageContainer>
      <CreateMenuItemDialog />
    </>
  );
};
