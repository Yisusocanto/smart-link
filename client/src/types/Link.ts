export interface Link {
  _id: string;
  originalURL: string;
  alias: string;
  clickCount: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
