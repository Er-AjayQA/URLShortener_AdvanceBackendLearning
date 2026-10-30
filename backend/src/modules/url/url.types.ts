export type createShortUrlInputType = {
  userId: string;
  originalUrl: string;
  shortCode: string;
};

export type updateShortUrlInptType = {
  updatedOriginalUrl: string;
};

export type ShortUrlType = {
  id: string;
  originalUrl: string;
  userId: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
};
