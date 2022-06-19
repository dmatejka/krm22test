import { IAdapter } from "./IAdapter";
import { Pagination } from "./ListPage";

export interface IListPage<LT> {
    page: Pagination,
    list: LT[]
}
export interface IListAdapter<T> {
  adapt(response: any, adapter: IAdapter<T>): IListPage<T>;
}
