export interface IArtist {
  artist_id: string;
  first_name: string;
  last_name: string;
  status_id: number;
}

export interface IArtistDto {
  artistId: string;
  firstName: string;
  lastName: string;
  statusId: string;
}

export type ICreateArtistDto = Omit<IArtist, 'artist_id'>;

export type IUpdateArtistDto = Partial<ICreateArtistDto>;
