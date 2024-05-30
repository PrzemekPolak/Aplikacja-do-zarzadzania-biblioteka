export class Author
{
  private constructor(
    public readonly name: string,
    public readonly surname: string,
  ) {
  }

  public static fromString(
    author: string,
  ): Author
  {
    return new Author(
      author,
      author.split(" ").pop() ?? '',
    );
  }

  public static fromValues(
    name: string,
    surname: string,
  ): Author
  {
    return new Author(name, surname);
  }
}
