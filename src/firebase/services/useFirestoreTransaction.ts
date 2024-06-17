import { useState } from "react";
import { addDoc, collection, doc, runTransaction } from "firebase/firestore";
import { db } from "../config";
import { METHOD } from "@/constant/method";
import { nanoid } from "@reduxjs/toolkit";
import { FIREBASE } from "@/constant/firebase";

const useFirestoreTransaction = () => {
  const [error, setError] = useState<string | null>(null);
  const actionLogCollectionRef = collection(db, FIREBASE.COLLECTION.ACTION_LOGS);

  const addDocumentWithTransaction = async (path: string, data: Record<string, unknown>) => {
    try {
      await runTransaction(db, async (transaction) => {
        const docId = nanoid();
        const docRef = doc(db, path, docId);
        const docSnapshot = await transaction.get(docRef);

        if (!docSnapshot.exists()) {
          transaction.set(docRef, data);
          await addDoc(actionLogCollectionRef, {
            userId: null,
            event: `${"user"}-${METHOD.POST}-category-${docId}`,
            action: METHOD.POST,
            status: "success",
            model: "log.model",
            itemId: docId,
            timestamp: new Date(),
          });
        } else {
          throw new Error(`Document ${docId} already exists in collection ${path}.`);
        }
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return { addDocumentWithTransaction, error };
};

export default useFirestoreTransaction;
