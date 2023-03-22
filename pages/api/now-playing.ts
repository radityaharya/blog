import { NextApiRequest, NextApiResponse } from "next"
import { SpotifyService } from "../../lib/spotify-now-playing/service/spotify"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const spotify = new SpotifyService(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET,
    process.env.SPOTIFY_REFRESH_TOKEN
  )
  const song = await spotify.getCurrentSong()

  if (song) {
    res.setHeader(
      "Cache-Control",
      `public, s-maxage=10, stale-while-revalidate=10`
    )
    return res.status(200).json(song)
  }

  return res.status(200).json({})
}
