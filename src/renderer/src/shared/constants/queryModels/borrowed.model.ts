interface IBorrowedData {
  id?: string;
  userId: string;
  bookId: number;
  borrowedDate: number;
  returnedDate: number | null;
  rating: number;
  userName: string;
  surname: string;
  phone: string;
  city: string;
  street: string;
  streetNumber: string;
  title: string;
  author: string;
}

export type { IBorrowedData };
