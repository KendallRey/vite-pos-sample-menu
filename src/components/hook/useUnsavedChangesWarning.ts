import { useEffect, useState } from "react";

const useUnsavedChangesWarning = (message: string = "You have unsaved changes, are you sure you want to leave?") => {
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, message]);

  return {
    setIsDirty,
  };
};

export default useUnsavedChangesWarning;
