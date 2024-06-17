const IS_DEV = import.meta.env.MODE === "development";

export const consoleLog = (data: unknown) => {
  if (!IS_DEV) return;
  console.log(data);
};

export const consoleError = (data: unknown) => {
  if (!IS_DEV) return;
  console.error(data);
};

export const appConsole = Object.assign(
  {},
  {
    log: consoleLog,
    error: consoleError,
  },
);
