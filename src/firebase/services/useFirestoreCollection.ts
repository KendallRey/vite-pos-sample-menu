import { useEffect, useState } from "react";
import { db } from "../config";
import { QuerySnapshot, collection, onSnapshot, query, where } from "firebase/firestore";
import { parseData } from "@/model/helper/data";

const useFirestoreCollection = <T = any>(collectionPath: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionPath), where("archived", "==", false));

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const updatedData = snapshot.docs.map((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          return parseData(data);
        });

        setData(updatedData as T[]);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [collectionPath]);

  return { data, loading, error };
};

export default useFirestoreCollection;
