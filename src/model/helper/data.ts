import { IMethod, METHOD } from "@/constant/method";
import { serverTimestamp } from "firebase/firestore";

type IData = Record<string, unknown>;

export const tranformData = (data: IData, method: IMethod) => {
  let infoData: IData = {
    created_at: null,
    updated_at: null,
    deleted_at: null,
    archived: false,
  };

  switch (method) {
    case METHOD.POST:
      infoData = {
        ...infoData,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      break;
    case METHOD.PUT:
      infoData = {
        ...infoData,
        updated_at: serverTimestamp(),
      };
      break;
    case METHOD.DELETE:
      infoData = {
        ...infoData,
        deleted_at: serverTimestamp(),
        archived: true,
      };
      break;
  }

  return {
    ...data,
    ...infoData,
  };
};
