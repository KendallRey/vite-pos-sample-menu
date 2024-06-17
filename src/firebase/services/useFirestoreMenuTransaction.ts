import { useState } from "react";
import { addDoc, collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../config";
import { METHOD } from "@/constant/method";
import { nanoid } from "@reduxjs/toolkit";
import { FIREBASE } from "@/constant/firebase";
import { ERRORS } from "@/constant/error";
import { IProductCreateSchema } from "@/model/product";
import { MenuItemCreateSchema } from "@/model/menu";
import { appConsole } from "@/helper/debugger";
import { getValidationErrors } from "@/model/helper/data";

const useFirestoreMenuTransaction = () => {

  const actionLogCollectionRef = collection(db, FIREBASE.COLLECTION.ACTION_LOGS);

  const addMenuItemProductApi = async (data: Partial<IProductCreateSchema>): Promise<IApiResponse> => {
    try {
      await runTransaction(db, async (transaction) => {
        const productID = nanoid();
        const productDoc = doc(db, FIREBASE.COLLECTION.PRODUCT, productID);
        const productSnapshot = await transaction.get(productDoc);
        if (productSnapshot.exists()) throw new Error(ERRORS.PRODUCT_ALREADY_EXISTS);

        const menuItemID = nanoid();
        const menuItemDoc = doc(db, FIREBASE.COLLECTION.MENU_ITEM, menuItemID);
        const menuItemSnapshot = await transaction.get(menuItemDoc);
        if (menuItemSnapshot.exists()) throw new Error(ERRORS.MENU_ITEM_ALREADY_EXISTS);
        
        const productData = {
          ...data,
          categories: data.categories?.map((item) => doc(db, FIREBASE.COLLECTION.CATEGORY, item.id))
        }

        transaction.set(productDoc, productData);

        const productDocRef = doc(db, FIREBASE.COLLECTION.PRODUCT, productDoc.id);

        const { categories, ...cleanProductData } = productData;
        const menuData = {
          ...cleanProductData,
          categories: data.categories?.map((item) => item.name),
          product_ref: productDocRef,
        };
        appConsole.log(menuData)
        const menuItemValidation = MenuItemCreateSchema.safeParse(menuData);
        if (!menuItemValidation.success) {
          const errors = getValidationErrors(menuItemValidation);
          appConsole.error(errors)
          throw new Error(ERRORS.MENU_ITEM_CREATE_VALIDATION_FAILED);
        }

        transaction.set(menuItemDoc, menuData);

        await addDoc(actionLogCollectionRef, {
          userId: null,
          event: `${"user"}-${METHOD.POST}-[${FIREBASE.COLLECTION.MENU_ITEM}, ${FIREBASE.COLLECTION.PRODUCT}]-[${productDoc.id}, ${menuItemDoc.id}]`,
          action: METHOD.POST,
          status: "success",
          model: "log.model",
          itemId: null,
          timestamp: serverTimestamp(),
        });
      });
      return {
        status: 'success',
        data: data
      }
    } catch (error) {
      const apiError = error as Error
      return {
        status: "failed",
        error: error,
        message: apiError?.message || ERRORS[505]
      };
    }
  };

  return { addMenuItemProductApi };
};

export default useFirestoreMenuTransaction;
