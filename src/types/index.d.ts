type ILayout = {
  children: React.ReactNode;
};

type IRoute = {
  id: string;
  title: string;
  href: string;
};

type IApiSuccessResponse<T = any> = {
  data: T;
  status: "success";
};

type IApiFailedResponse<T = any> = {
  error: T;
  status: "failed";
  message: string;
};

type IApiResponse<T = any> = IApiSuccessResponse<T> | IApiFailedResponse<T>;

/**
 * Wrapper for Form
 * @typeParam T - Form type
 */
type IReduxFormState<T> = {
  error: Partial<Record<keyof T, string>>;
} & Partial<T>;

type RCE<T = HTMLInputElement> = React.ChangeEvent<T>;
