import MuiDialog from "@/components/dialog/Dialog";
import { useCallback } from "react";
import MenuItemForm from "./MenuItemForm";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import useFirestoreMenuTransaction from "@/firebase/services/useFirestoreMenuTransaction";
import { getValidationErrors, transformData } from "@/model/helper/data";
import { METHOD } from "@/constant/method";
import { setView } from "@/redux/features/form-dialogs/formDialogsSlice";
import { MenuItemCreateSchema } from "@/model/menu";
import { clearMenuItemForm, setMenuItemFormError } from "@/redux/features/menu/menuItemFormSlice";
import { appConsole } from "@/helper/debugger";
import { appEnqueueSnackbar } from "@/components/helper/snackbar";
import { SUCCESS } from "@/constant/error";

const CreateMenuItemDialog = () => {
  const dispatch = useAppDispatch();
  const openDialog = useAppSelector((state) => state.formDialogs.create_menu_item);

  const onClose = useCallback(() => {
    dispatch(setView({ view: "create_menu_item", open: false }));
  }, [dispatch]);

  const { error, ...form } = useAppSelector((state) => state.menuItemForm);

  const { addMenuItemProductApi } = useFirestoreMenuTransaction();

  const onAddNewProduct = useCallback(async () => {
    const clearFormData = transformData(form, METHOD.POST);
    const data = await addMenuItemProductApi(clearFormData);
    appConsole.log(data)
    if(data.status === 'failed'){
      appEnqueueSnackbar({
        variant: 'error',
        message: data.message
      })
      return;
    }
    dispatch(clearMenuItemForm())
    onClose();
    appEnqueueSnackbar({
      variant: 'success',
      message: SUCCESS.PRODUCT_CREATED,
    })
  },[addMenuItemProductApi, dispatch])

  const onValidateProduct = useCallback(() => {
    const clearFormData = transformData(form, METHOD.POST);
    const menuItemValidation = MenuItemCreateSchema.safeParse(clearFormData);
    if (!menuItemValidation.success) {
      const error = getValidationErrors(menuItemValidation);
      appConsole.error(error);
      dispatch(setMenuItemFormError(error));
    }
    onAddNewProduct();
  }, [dispatch, form, onAddNewProduct]);

  return (
    <MuiDialog
      title={"Create New Product"}
      onConfirm={onValidateProduct}
      onClose={onClose}
      confirmText="Save Product"
      variant="form"
      maxWidth="md"
      fullWidth
      open={Boolean(openDialog)}
    >
      <MenuItemForm />
    </MuiDialog>
  );
};

export default CreateMenuItemDialog;
