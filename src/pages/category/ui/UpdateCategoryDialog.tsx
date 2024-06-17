import MuiDialog from "@/components/dialog/Dialog";
import CategoryForm from "./CategoryForm";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback } from "react";
import { clearCategoryToUpdate } from "@/redux/features/form-dialogs/formDialogsSlice";
import useFirestoreCategoryTransaction from "@/firebase/services/useFirestoreCategoryTransaction";
import { transformData } from "@/model/helper/data";
import { METHOD } from "@/constant/method";
import { clearCategoryForm } from "@/redux/features/category/categoryFormSlice";

const UpdateCategoryDialog = () => {
  const dispatch = useAppDispatch();
  const categoryToUpdate = useAppSelector((state) => state.formDialogs.categoryToUpdate);
  const { error, ...form } = useAppSelector((state) => state.categoryForm);

  const { updateCategoryApi } = useFirestoreCategoryTransaction();

  const onClose = useCallback(() => {
    dispatch(clearCategoryForm());
    dispatch(clearCategoryToUpdate());
  }, [dispatch]);

  const updateCategory = useCallback(async () => {
    if (!categoryToUpdate) return;
    const clearFormData = transformData(form, METHOD.PUT);
    await updateCategoryApi(clearFormData, categoryToUpdate.id);
    onClose();
  }, [dispatch, updateCategoryApi, onClose, form, categoryToUpdate]);

  return (
    <MuiDialog
      title={"Update Category"}
      onClose={onClose}
      onConfirm={updateCategory}
      variant="form"
      confirmText="Update Category"
      maxWidth="sm"
      fullWidth
      open={Boolean(categoryToUpdate)}
    >
      <CategoryForm />
    </MuiDialog>
  );
};

export default UpdateCategoryDialog;
