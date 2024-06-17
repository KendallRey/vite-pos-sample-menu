export const ERRORS = {
  505: 'ERROR 500',
  PRODUCT_ALREADY_EXISTS: "Product already exists.",
  CATEGORY_ALREADY_EXISTS: "Category already exists.",
  CATEGORY_NOT_FOUND: "Category not found.",
  CATEGORY_CREATE_VALIDATION_FAILED: "Category Create Validation Failed!",
  CATEGORY_UPDATE_VALIDATION_FAILED: "Category Update Validation Failed!",
  MENU_ITEM_ALREADY_EXISTS: "Menu Item already exists.",
  MENU_ITEM_CREATE_VALIDATION_FAILED: "Menu Item Create Validation Failed!",
  OUT_OF_STOCK: "Product is out of stock",
} as const;

export const SUCCESS = {
  PRODUCT_CREATED: "Product saved successfully!",
  PRODUCT_UPDATED: "Product updated successfully!",
  CATEGORY_CREATED: "Category saved successfully!",
  CATEGORY_UPDATED: "Product saved successfully!",
}