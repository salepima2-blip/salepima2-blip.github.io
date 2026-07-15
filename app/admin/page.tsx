"use client";

import { FormEvent, useEffect, useState } from "react";
import { adminRequest, CmsProduct, signIn, uploadMedia } from "../lib/pima-api";
import "./admin.css";

const emptyProduct: Partial<CmsProduct> = { slug: "", category: "", name: "", tagline: "", summary: "", description: "", cover_image_url: "", video_url: "", gallery: [], features: [], applications: [], specifications: [], published: true, featured: false, sort_order: 50 };
const splitLines = (value: string) => value.split("\n").map(v => v.trim()).filter(Boolean);

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<CmsProduct[]>([]);
  const [draft, setDraft] = useState<any>(emptyProduct);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { setToken(sessionStorage.getItem("pima_admin_token") || ""); }, []);
  useEffect(() => { if (token) loadProducts(); }, [token]);

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    try { const data = await signIn(email, password); sessionStorage.setItem("pima_admin_token", data.access_token); setToken(data.access_token); }
    catch (error: any) { setMessage(error.message); } finally { setBusy(false); }
  }

  async function loadProducts() {
    try { const data = await adminRequest("/rest/v1/products?select=*&order=sort_order.asc", token); setProducts(data || []); }
    catch (error: any) { setMessage("Tài khoản chưa có quyền quản trị: " + error.message); }
  }

  function edit(item: CmsProduct) { setDraft({ ...item, featuresText: (item.features || []).join("\n"), applicationsText: (item.applications || []).join("\n") }); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function save(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const payload = { ...draft, features: splitLines(draft.featuresText || ""), applications: splitLines(draft.applicationsText || "") };
    delete payload.featuresText; delete payload.applicationsText; delete payload.created_at; delete payload.updated_at;
    try {
      if (payload.id) await adminRequest(`/rest/v1/products?id=eq.${payload.id}`, token, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(payload) });
      else await adminRequest("/rest/v1/products", token, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(payload) });
      setMessage("Đã lưu và website sẽ hiển thị nội dung mới ngay."); setDraft(emptyProduct); await loadProducts();
    } catch (error: any) { setMessage(error.message); } finally { setBusy(false); }
  }

  async function upload(file?: File) {
    if (!file) return; setBusy(true); setMessage("Đang tải tệp...");
    try {
      const media = await uploadMedia(file, token);
      if (file.type.startsWith("video/")) setDraft((d: any) => ({ ...d, video_url: media.url }));
      else setDraft((d: any) => ({ ...d, cover_image_url: media.url }));
      setMessage("Đã tải tệp. Nhấn “Lưu sản phẩm” để áp dụng.");
    } catch (error: any) { setMessage(error.message); } finally { setBusy(false); }
  }

  async function remove(id: string) {
    if (!confirm("Xóa sản phẩm này?")) return;
    try { await adminRequest(`/rest/v1/products?id=eq.${id}`, token, { method: "DELETE" }); await loadProducts(); }
    catch (error: any) { setMessage(error.message); }
  }

  if (!token) return <main className="admin-page"><section className="admin-login"><p className="eyebrow">PIMA Content Studio</p><h1>Đăng nhập quản trị</h1><p>Quản lý sản phẩm, hình ảnh và video hiển thị trên website.</p><form onSubmit={login}><label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label><label>Mật khẩu<input type="password" required value={password} onChange={e => setPassword(e.target.value)} /></label><button className="button primary" disabled={busy}>Đăng nhập →</button>{message && <p className="admin-message">{message}</p>}</form></section></main>;

  return <main className="admin-page"><header className="admin-top"><div><p className="eyebrow">PIMA Content Studio</p><h1>Quản trị nội dung</h1></div><button className="button ghost" onClick={() => { sessionStorage.removeItem("pima_admin_token"); setToken(""); }}>Đăng xuất</button></header>
    {message && <div className="admin-notice">{message}</div>}
    <section className="admin-grid">
      <form className="admin-editor" onSubmit={save}>
        <div className="admin-section-title"><h2>{draft.id ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h2><button type="button" onClick={() => setDraft(emptyProduct)}>Tạo mới</button></div>
        <div className="admin-fields two"><label>Tên sản phẩm<input required value={draft.name || ""} onChange={e => setDraft({...draft,name:e.target.value})}/></label><label>Đường dẫn (slug)<input required pattern="[a-z0-9-]+" value={draft.slug || ""} onChange={e => setDraft({...draft,slug:e.target.value})}/></label></div>
        <div className="admin-fields two"><label>Danh mục<input required value={draft.category || ""} onChange={e => setDraft({...draft,category:e.target.value})}/></label><label>Thứ tự<input type="number" value={draft.sort_order || 0} onChange={e => setDraft({...draft,sort_order:Number(e.target.value)})}/></label></div>
        <label>Dòng giới thiệu<input value={draft.tagline || ""} onChange={e => setDraft({...draft,tagline:e.target.value})}/></label>
        <label>Tóm tắt<textarea rows={3} value={draft.summary || ""} onChange={e => setDraft({...draft,summary:e.target.value})}/></label>
        <label>Nội dung chi tiết<textarea rows={6} value={draft.description || ""} onChange={e => setDraft({...draft,description:e.target.value})}/></label>
        <div className="admin-upload-grid"><label className="upload-box">Ảnh đại diện<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e => upload(e.target.files?.[0])}/><span>Chọn ảnh để tải lên</span></label><label className="upload-box">Video giới thiệu<input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={e => upload(e.target.files?.[0])}/><span>Chọn video tối đa 100 MB</span></label></div>
        {draft.cover_image_url && <img className="admin-preview" src={draft.cover_image_url} alt="Ảnh xem trước" />}
        {draft.video_url && <video className="admin-preview" src={draft.video_url} controls />}
        <label>Ưu điểm (mỗi dòng một ý)<textarea rows={5} value={draft.featuresText ?? (draft.features || []).join("\n")} onChange={e => setDraft({...draft,featuresText:e.target.value})}/></label>
        <label>Ứng dụng (mỗi dòng một ý)<textarea rows={4} value={draft.applicationsText ?? (draft.applications || []).join("\n")} onChange={e => setDraft({...draft,applicationsText:e.target.value})}/></label>
        <div className="admin-checks"><label><input type="checkbox" checked={!!draft.published} onChange={e => setDraft({...draft,published:e.target.checked})}/> Đang hiển thị</label><label><input type="checkbox" checked={!!draft.featured} onChange={e => setDraft({...draft,featured:e.target.checked})}/> Sản phẩm nổi bật</label></div>
        <button className="button primary" disabled={busy}>{busy ? "Đang xử lý..." : "Lưu sản phẩm →"}</button>
      </form>
      <aside className="admin-list"><h2>Danh sách sản phẩm</h2>{products.map(item => <article key={item.id}>{item.cover_image_url ? <img src={item.cover_image_url} alt=""/> : <div className="admin-placeholder"/>}<div><b>{item.name}</b><small>{item.category} · {item.published ? "Đang hiện" : "Đang ẩn"}</small><p><button onClick={() => edit(item)}>Sửa</button><button className="danger" onClick={() => remove(item.id)}>Xóa</button></p></div></article>)}</aside>
    </section>
  </main>;
}
