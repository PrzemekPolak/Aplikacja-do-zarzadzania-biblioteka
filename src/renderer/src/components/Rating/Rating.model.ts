interface IRatingProps {
  value: number | null;
  borrowingIdentity: string,
  inForm: boolean;
  isBorrowed: boolean;
}

interface IAverageRatingProps {
  value: number | null;
}

export type { IRatingProps, IAverageRatingProps };
