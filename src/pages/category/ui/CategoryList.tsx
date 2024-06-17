import { FIREBASE } from "@/constant/firebase";
import useFirestoreCollection from "@/firebase/services/useFirestoreCollection";
import { ICategory } from "@/model/category";
import CategoryListItem from "./CategoryListItem";

const CategoryList = () => {
  const { data: categories } = useFirestoreCollection<ICategory>(FIREBASE.COLLECTION.CATEGORY);

  return (
    <div className="grid grid-cols-4 gap-4 flex flex-grow items-center">
      {categories.map((item) => (
        <CategoryListItem key={item.id} category={item} />
      ))}
    </div>
  );
};

export default CategoryList;
