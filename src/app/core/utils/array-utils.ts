import { User } from 'src/app/users/models/User';

export function mergeArraysById(old: User[], newArr: User[]): User[] {
  return [
    ...old.map((oldI) => newArr.find((i) => oldI.id === i.id) || oldI),
    ...newArr.filter((newI) => !old.find((i) => i.id === newI.id)),
  ];
}
