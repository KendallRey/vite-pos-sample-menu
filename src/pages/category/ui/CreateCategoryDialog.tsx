import MuiDialog from "@/components/dialog/Dialog";
import CategoryForm from "./CategoryForm";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback } from "react";
import { setView } from "@/redux/features/form-dialogs/formDialogsSlice";
import useFirestoreCategoryTransaction from "@/firebase/services/useFirestoreCategoryTransaction";
import { transformData } from "@/model/helper/data";
import { METHOD } from "@/constant/method";

const CreateCategoryDialog = () => {
  const dispatch = useAppDispatch();
  const openDialog = useAppSelector((state) => state.formDialogs.create_category);
  const { error, ...form } = useAppSelector((state) => state.categoryForm);

  const { addCategoryApi } = useFirestoreCategoryTransaction();

  const onClose = useCallback(() => {
    dispatch(setView({ view: "create_category", open: false }));
  }, [dispatch]);

  const addCategory = useCallback(async () => {
    const clearFormData = transformData(form, METHOD.POST);
    await addCategoryApi(clearFormData);
    onClose();
  }, [dispatch, addCategoryApi, onClose, form]);

  return (
    <MuiDialog
      title={"Create New Category"}
      onClose={onClose}
      onConfirm={addCategory}
      variant="form"
      confirmText="Create Category"
      maxWidth="sm"
      fullWidth
      open={Boolean(openDialog)}
    >
      <CategoryForm />
    </MuiDialog>
  );
};

export default CreateCategoryDialog;
