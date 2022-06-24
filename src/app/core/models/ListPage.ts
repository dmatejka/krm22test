import { Injectable } from '@angular/core';
import { IAdapter } from './IAdapter';
import { IListAdapter, IListPage } from './IListPage';

export interface ListPageResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: any[];
}
export class Pagination {
  constructor(
    public page: number,
    public per_page: number,
    public total: number,
    public total_pages: number
  ) {}
}
export class ListPage<T> implements IListPage<T> {
  constructor(public page: Pagination, public list: T[]) {}
}

@Injectable({
  providedIn: 'root',
})
export class ListPageAdapter<T> implements IListAdapter<T> {
  adapt(listpage: ListPageResponse, adapter: IAdapter<T>): IListPage<T> {
    const { page, per_page, total, total_pages } = listpage;

    return new ListPage<T>(
      new Pagination(page, per_page, total, total_pages),
      listpage.data?.map((item: any) => adapter.adapt(item))
    );
  }
}
