import crypto from 'crypto';


export async function cachedFetch(url: string, options?: RequestInit, env?: Record<string, any>): Promise<any> {
    const blogKV = env?.BLOG_KV;
    let keySource = url;
    if (options?.body) {
        keySource += JSON.stringify(options.body);
    }
    const hash = crypto.createHash('sha256').update(keySource).digest('hex');
    
    if (blogKV) {
        const cached = await blogKV.get(hash);
        if (cached) {
            console.log('Using cached data for', url);
            return JSON.parse(cached);
        }
    }
    
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }
    const data = await response.json();
    
    if (blogKV) {
        await blogKV.put(hash, JSON.stringify(data), { expirationTtl: 3600 });
    }
    return data;
}
