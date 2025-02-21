export async function cachedFetch(url: string, options?: RequestInit, env?: Record<string, any>, cacheKey?: string): Promise<any> {
    const blogKV = env?.BLOG_KV;
    const key = cacheKey || url;
    
    try {
        // Try to get cached data
        if (blogKV) {
            const cached = await blogKV.get(key);
            if (cached) {
                const parsedCache = JSON.parse(cached);
                return parsedCache;
            }
        }
        
        // Fetch fresh data
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Cache the response
        if (blogKV) {
            await blogKV.put(key, JSON.stringify(data), { expirationTtl: 3600 });
        }
        
        return data;
    } catch (error) {
        console.error(`Cache/fetch error for ${key}:`, error);
        throw error;
    }
}
