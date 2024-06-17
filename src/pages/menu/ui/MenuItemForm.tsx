import { MuiFormSelect } from "@/components/select/Select";
import { MuiMoneyField } from "@/components/text-field/MoneyField";
import { MuiNumberField } from "@/components/text-field/NumberField";
import MuiTextField from "@/components/text-field/TextField";
import {
  editMenuItemForm,
  selectMenuItemCategory,
  setMenuItemCategories,
  toggleMenuItemLargePrice,
  toggleMenuItemSmallPrice,
} from "@/redux/features/menu/menuItemFormSlice";
import { InputRecord, getInputRecord, getSelectMultipleInputRecord } from "@/redux/helper/input";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { useCallback } from "react";
import MenuItemFormPreview from "./MenuItemFormPreview";
import { ButtonGroup, Checkbox, Divider, ListItemText, MenuItem, Typography } from "@mui/material";
import useFirestoreCollection from "@/firebase/services/useFirestoreCollection";
import { ICategory } from "@/model/category";
import { FIREBASE } from "@/constant/firebase";
import { selectDataArrayOfByIDs } from "@/model/helper/data";
import { _selectMenuItemFormCategory } from "@/redux/features/menu/menuItemFormSelector";
import MuiChip from "@/components/chip/Chip";
import MuiButton from "@/components/button/Button";

const MenuItemForm = () => {
  const dispatch = useAppDispatch();
  const { error, ...form } = useAppSelector((state) => state.menuItemForm);

  const formCategory = useAppSelector(_selectMenuItemFormCategory);

  const { data: categories } = useFirestoreCollection<ICategory>(FIREBASE.COLLECTION.CATEGORY);

  const onChange = useCallback(
    (e: InputRecord) => {
      const record = getInputRecord(e, { zeroIsNull: true });
      dispatch(editMenuItemForm(record));
    },
    [dispatch],
  );

  const onChangeCategory = useCallback(
    (e: InputRecord) => {
      const { list } = getSelectMultipleInputRecord(e);
      const _categories = selectDataArrayOfByIDs(categories, list);
      dispatch(setMenuItemCategories(_categories));
    },
    [dispatch, categories],
  );

  const onRemoveCategory = useCallback(
    (item: ICategory) => {
      dispatch(selectMenuItemCategory({ item, select: false }));
    },
    [dispatch],
  );

  const onToggleSmallPrice = useCallback(() => {
    dispatch(toggleMenuItemSmallPrice());
  }, [dispatch]);

  const onToggleLargePrice = useCallback(() => {
    dispatch(toggleMenuItemLargePrice());
  }, [dispatch]);

  return (
    <form className="flex items-center flex-wrap gap-12 ">
      <div className="flex flex-col gap-4">
        <Typography>Preview</Typography>
        <MenuItemFormPreview />
      </div>
      <Divider orientation="vertical" className="min-h-[500px] h-full" />
      <div className="flex flex-grow flex-col gap-3 max-w-[320px]">
        <MuiTextField label="Name *" name="name" value={form.name || ""} errorText={error.name} onChange={onChange} />
        <Divider />
        <ButtonGroup size="small">
          <MuiButton variant={form.small_price !== undefined ? "contained" : "outlined"} onClick={onToggleSmallPrice}>
            Small
          </MuiButton>
          <MuiButton variant={form.large_price !== undefined ? "contained" : "outlined"} onClick={onToggleLargePrice}>
            Large
          </MuiButton>
        </ButtonGroup>
        {form.small_price !== undefined && (
          <MuiMoneyField
            label="Small Price *"
            name="small_price"
            value={form.small_price || ""}
            errorText={error.small_price}
            onChange={onChange}
          />
        )}
        <MuiMoneyField
          label="Price *"
          name="price"
          value={form.price || ""}
          errorText={error.price}
          onChange={onChange}
        />
        {form.large_price !== undefined && (
          <MuiMoneyField
            label="Large Price *"
            name="large_price"
            value={form.large_price || ""}
            errorText={error.large_price}
            onChange={onChange}
          />
        )}
        <Divider />
        <MuiNumberField
          label="Stock *"
          name="stock"
          errorText={error.stock}
          value={form.stock || ""}
          numericProps={{ thousandSeparator: true }}
          onChange={onChange}
        />
        <MuiTextField
          multiline
          label="Description"
          name="description"
          value={form.description || ""}
          rows={2}
          onChange={onChange}
        />
        <Divider />
        <div className="flex flex-wrap gap-2">
          {formCategory.list.map((item) => (
            <MuiChip key={item.id} label={item.name} color="primary" onDelete={() => onRemoveCategory(item)} />
          ))}
        </div>
        <MuiFormSelect
          multiple
          value={formCategory.ids}
          label={"Category"}
          onChange={onChangeCategory}
          renderValue={() => formCategory.value}
        >
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={formCategory.ids.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </MuiFormSelect>
      </div>
    </form>
  );
};

export default MenuItemForm;
