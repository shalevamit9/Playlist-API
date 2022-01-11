interface IArtistDto {
  _id: string;
  firstName: string;
  lastName: string;
  songs: string[];
}

export type ICreateArtistDto = Omit<IArtistDto, '_id'>;

export type IUpdateArtistDto = Partial<ICreateArtistDto>;
