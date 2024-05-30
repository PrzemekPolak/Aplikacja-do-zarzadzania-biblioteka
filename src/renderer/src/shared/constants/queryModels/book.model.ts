interface IBookData {
  id: number;
  title: string;
  author: string;
  authorSurname: string | null;
  isBorrowed: number | null;
  avgRating: number | null;
}

export type { IBookData };
