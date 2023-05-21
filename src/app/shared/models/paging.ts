export interface Paging<T>{
  count:number,
  pageIndex:number,
  pageSize:number,
  totalPage:number,
  items:T
}
