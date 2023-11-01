export interface DynamicKey {
  [key: string]: unknown;
}

export type EndPoint = {
  /** Name of the route */
  name: string;
  /**
   * Full url.
   *
   * Example: https://developer.mozilla.org/docs/Web/API/fetch
   */
  url: string;
  /**
   * Relative path
   *
   * Example: /docs/Web/API/fetch
   */
  path: string;
  /** EndPoint method */
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

export type AuthProvider = "local";

export type JWT = string;

export interface UserAttributes {
  username: string;
  email: string;
  blocked: false;
  confirmed: true;
  provider: AuthProvider;
  createdAt: string;
  updatedAt: string;
}

export interface User extends UserAttributes, DynamicKey {
  id: number;
}

export interface UserResponse extends DynamicKey {
  id: number;
  attributes: UserAttributes;
}

export interface ErrorResponse {
  message: string;
  name: string;
  status: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface TodoAttributes {
  description: null;
  is_completed: boolean;
  createdAt: string;
  updatedAt: string;
  locale: string;
  name: null;
}

export interface Todo extends DynamicKey {
  id: number;
  attributes: TodoAttributes;
  user?: {
    data: UserResponse;
  };
}

export interface Collection<TData, TMeta> {
  data: TData[];
  meta: TMeta;
}

export interface CollectionPaginated<TData> {
  data: TData[];
  meta: {
    pagination: Pagination;
  };
}

interface AddTodoRequest {
  data: {
    name: string;
    description?: string;
    /** User id */
    user: number;
  };
}
