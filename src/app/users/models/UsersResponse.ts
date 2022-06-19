import { Injectable } from "@angular/core";
import { IListAdapter, IListPage} from "src/app/core/models/IListPage";
import { User, UserAdapter } from 'src/app/users/models/User';
import { ListPageAdapter } from "src/app/core/models/ListPage";

export type UserListResponse = {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  support: {
    url: string,
    text: string,
  },
  data: User[],
}

@Injectable({
  providedIn: "root",
})
export class UserListResponseAdapter implements IListAdapter<User> {

  constructor(
    private listAdapter: ListPageAdapter<User>,
    private adapter: UserAdapter
  ) {}
  adapt(response: UserListResponse): IListPage<User> {
    return this.listAdapter.adapt(response, this.adapter);
  }

}
