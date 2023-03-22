import { SongResult } from "../utils/type"
export declare class SpotifyService {
  private accessToken
  private clientId
  private clientSecret
  private refreshToken
  constructor(clientId: string, clientSecret: string, refreshToken: string)
  private hasAccessToken
  private setAccessToken
  private getAccessToken
  getCurrentSong(): Promise<SongResult>
}
