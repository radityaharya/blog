export async function cachedFetch(url: string, options?: RequestInit, env?: Record<string, any>, cacheKey?: string): Promise<any> {
    const blogKV = env?.BLOG_KV;
    const key = cacheKey || url;
    
    if (blogKV) {
        const cached = await blogKV.get(key);
        if (cached) {
            console.log('Using cached data for', key);
            return JSON.parse(cached);
        }
    }
    
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }
    const data = await response.json();
    
    if (blogKV) {
        await blogKV.put(key, JSON.stringify(data), { expirationTtl: 3600 });
    }
    return data;
}
