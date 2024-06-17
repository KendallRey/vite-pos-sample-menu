import MuiButton from "@/components/button/Button";
import { setView } from "@/redux/features/form-dialogs/formDialogsSlice";
import { useAppDispatch } from "@/redux/services/hooks";
import { useCallback } from "react";

import { BsPlus } from "react-icons/bs";

const CategoryPageActions = () => {
  const dispatch = useAppDispatch();

  const onClickAddCategory = useCallback(() => {
    dispatch(setView({ view: "create_category", open: true }));
  }, [dispatch]);

  return (
    <div className="flex justify-end">
      <MuiButton variant="contained" onClick={onClickAddCategory} startIcon={<BsPlus />}>
        Add Category
      </MuiButton>
    </div>
  );
};

export default CategoryPageActions;
