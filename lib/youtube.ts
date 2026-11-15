/**
 * Últimos vídeos del canal de YouTube a través de su feed RSS público (sin API key).
 * Si el feed falla o tarda, devuelve una lista vacía y la web muestra tarjetas a los canales.
 */
export const YOUTUBE_CHANNEL_ID = 'UCs0RH5r_b98QfHzRsMep1Lg'; // @MasterCollectionsClub

export type LatestVideo = {
  id: string;
  title: string;
  published: string; // ISO
};

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)));
}

export async function getLatestVideos(limit = 3): Promise<LatestVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
      { next: { revalidate: 1800 }, signal: AbortSignal.timeout(5000) },
    );
    if (!res.ok) return [];
    const xml = await res.text();

    const videos: LatestVideo[] = [];
    for (const entry of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const id = /<yt:videoId>([\w-]{11})<\/yt:videoId>/.exec(entry[1])?.[1];
      const title = /<title>([\s\S]*?)<\/title>/.exec(entry[1])?.[1];
      const published = /<published>(.*?)<\/published>/.exec(entry[1])?.[1];
      if (id && title && published) {
        videos.push({ id, title: decodeEntities(title).trim(), published });
      }
      if (videos.length >= limit) break;
    }
    return videos;
  } catch (error) {
    console.error('[youtube] No se pudo leer el feed del canal:', error);
    return [];
  }
}
