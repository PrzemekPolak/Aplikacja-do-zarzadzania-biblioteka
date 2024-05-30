export class ListView
{
  public static create(list: any, count: number)
  {
    return {
      'listData': list,
      'fullLength': count,
    };
  }
}
