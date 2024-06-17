import MuiButton from "@/components/button/Button";
import { setView } from "@/redux/features/form-dialogs/formDialogsSlice";
import { useAppDispatch } from "@/redux/services/hooks";
import { useCallback } from "react";

import { BsPlus } from "react-icons/bs";

const MenuPageActions = () => {
  const dispatch = useAppDispatch();

  const onClickAddMenu = useCallback(() => {
    dispatch(setView({ view: "create_menu_item", open: true }));
  }, [dispatch]);

  return (
    <div className="flex justify-end">
      <MuiButton variant="contained" onClick={onClickAddMenu} startIcon={<BsPlus />}>
        Add Product
      </MuiButton>
    </div>
  );
};

export default MenuPageActions;
