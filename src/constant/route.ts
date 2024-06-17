export const ROUTE = {
  HOME: {
    TITLE: "Home",
    HREF: "/",
    ID: "home",
  },
  CATEGORY: {
    TITLE: "Category",
    HREF: "/category",
    ID: "category",
  },
  ACTION_LOGS: {
    TITLE: "Action Logs",
    HREF: "/action-logs",
    ID: "action-logs",
  },
} as const;

export const AUTH_ROUTES: IRoute[] = [
  { id: ROUTE.HOME.ID, title: ROUTE.HOME.TITLE, href: ROUTE.HOME.HREF },
  { id: ROUTE.CATEGORY.ID, title: ROUTE.CATEGORY.TITLE, href: ROUTE.CATEGORY.HREF },
  { id: ROUTE.ACTION_LOGS.ID, title: ROUTE.ACTION_LOGS.TITLE, href: ROUTE.ACTION_LOGS.HREF },
] as const;
