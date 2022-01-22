// export interface IArtist {
//   artist_id: string;
//   first_name: string;
//   last_name: string;
//   status_id: number;
// }

export interface IArtist {
  artistId: string;
  firstName: string;
  lastName: string;
  statusId: number;
}

export type ICreateArtistDto = Omit<IArtist, 'artistId'>;

export type IUpdateArtistDto = Partial<ICreateArtistDto>;
