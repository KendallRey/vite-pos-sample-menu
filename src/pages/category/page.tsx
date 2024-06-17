import PageContainer from "@/components/container/Page";
import CategoryList from "./ui/CategoryList";
import CreateCategoryDialog from "./ui/CreateCategoryDialog";
import CategoryPageActions from "./ui/CategoryPageActions";
import UpdateCategoryDialog from "./ui/UpdateCategoryDialog";
import DeleteCategoryDialog from "./ui/DeleteCategoryDialog";

const CategoryPage = () => {
  return (
    <>
      <PageContainer title="Category">
        <CategoryPageActions />
        <CategoryList />
      </PageContainer>
      <CreateCategoryDialog />
      <UpdateCategoryDialog />
      <DeleteCategoryDialog />
    </>
  );
};

export default CategoryPage;
