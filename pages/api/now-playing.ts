import { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyService } from '../../lib/spotify-now-playing/service/spotify'
import cacheData from "memory-cache";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    const cacheminutes = 1
    const spotify = new SpotifyService(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET, process.env.SPOTIFY_REFRESH_TOKEN)
    const song = await spotify.getCurrentSong()

    if (song) {
        const cachedSong = cacheData.get('song')
        if (cachedSong) {
            if (cachedSong.title === song.title && cachedSong.artists === song.artists) {
                return res.status(200).json(cachedSong)
            }
        }
        cacheData.put('song', song, cacheminutes * 60 * 1000)
        return res.status(200).json(song)
    }

    return res.status(200).json({})
    
}





