type ILayout = {
  children: React.ReactNode;
};

type IRoute = {
  id: string;
  title: string;
  href: string;
};

/**
 * Wrapper for Form
 * @typeParam T - Form type
 */
type IReduxFormState<T> = {
  error: Partial<Record<keyof T, string>>;
} & Partial<T>;
