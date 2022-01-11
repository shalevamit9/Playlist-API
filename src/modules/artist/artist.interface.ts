interface IArtistDro {
  _id: string;
  firstName: string;
  lastName: string;
  songs: string[];
}

export type ICreateArtistDto = Omit<IArtistDro, '_id'>;

export type IUpdateArtistDto = Partial<ICreateArtistDto>;
