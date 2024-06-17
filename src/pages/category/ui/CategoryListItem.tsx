import MuiButton from "@/components/button/Button";
import MuiChip from "@/components/chip/Chip";
import { ICategory } from "@/model/category";
import { getCleanFormData, parseData } from "@/model/helper/data";
import { setCategoryForm } from "@/redux/features/category/categoryFormSlice";
import { setCategoryToDelete, setCategoryToUpdate } from "@/redux/features/form-dialogs/formDialogsSlice";
import { useAppDispatch } from "@/redux/services/hooks";
import { Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import { useCallback } from "react";

type ICategoryListItem = {
  category: ICategory;
};

const CategoryListItem: React.FC<ICategoryListItem> = ({ category }) => {
  const { name, description } = category;

  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    const parsedData = parseData<ICategory>(category);
    const cleanCategory = getCleanFormData(parsedData);
    dispatch(setCategoryForm(cleanCategory));
    dispatch(setCategoryToUpdate(parsedData));
  }, [dispatch, category]);

  const onDelete = useCallback(() => {
    const parsedData = parseData<ICategory>(category);
    dispatch(setCategoryToDelete(parsedData));
  }, [dispatch, category]);

  return (
    <Card className="max-w-[300px]">
      <CardContent className="flex flex-col gap-2">
        <div>
          <MuiChip label={name} />
        </div>
        <Divider />
        <Typography variant={description ? "body2" : "caption"}>{description || "No Description"}</Typography>
      </CardContent>
      <CardActions disableSpacing className="flex items-center justify-between">
        <MuiButton onClick={onEdit} variant="contained" size="small">
          Edit
        </MuiButton>
        <MuiButton onClick={onDelete} size="small" color="error">
          Delete
        </MuiButton>
      </CardActions>
    </Card>
  );
};

export default CategoryListItem;
