export const SUPABASE_URL = "https://cwqtfbatuyrspzilyjzc.supabase.co";
export const SUPABASE_KEY = "sb_publishable_zABIFobcpHVFwcnwOS9pGQ_0Qd_Ml80";

const headers = (token?: string) => ({
  apikey: SUPABASE_KEY,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export type CmsProduct = {
  id: string; slug: string; category: string; name: string; tagline?: string;
  summary?: string; description?: string; cover_image_url?: string; video_url?: string;
  gallery?: { url: string; alt?: string; type?: "image" | "video" }[];
  features?: string[]; specifications?: { label: string; value: string }[];
  applications?: string[]; published: boolean; featured: boolean; sort_order: number;
};

export async function getProduct(slug: string): Promise<CmsProduct | null> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/products?slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`, {
    headers: headers(), cache: "no-store",
  });
  if (!response.ok) return null;
  const rows = await response.json();
  return rows[0] || null;
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST", headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || data.msg || "Đăng nhập không thành công");
  return data;
}

export async function adminRequest(path: string, token: string, init: RequestInit = {}) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: { ...headers(token), "Content-Type": "application/json", ...(init.headers || {}) },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || data.msg || `Lỗi ${response.status}`);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function uploadMedia(file: File, token: string) {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/pima-media/${path}`, {
    method: "POST",
    headers: { ...headers(token), "Content-Type": file.type, "x-upsert": "false" },
    body: file,
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Không thể tải tệp lên");
  }
  return { path, url: `${SUPABASE_URL}/storage/v1/object/public/pima-media/${path}` };
}
