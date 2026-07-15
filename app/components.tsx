"use client";

import { FormEvent, ReactNode, useState } from "react";
import { productLinks } from "./catalog-data";

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="/" aria-label="PIMA Interior - Trang chủ">PIMA<span>INTERIOR</span></a>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Mở menu">{open ? "Đóng" : "Menu"}</button>
    <nav className={open ? "nav open" : "nav"} aria-label="Điều hướng chính">
      <a href="/san-pham" onClick={() => setOpen(false)}>Sản phẩm</a>
      <a href="/vat-lieu-pima" onClick={() => setOpen(false)}>Vật liệu PIMA</a>
      <a href="/doi-tac" onClick={() => setOpen(false)}>Dành cho đối tác</a>
      <a href="/lien-he" onClick={() => setOpen(false)}>Liên hệ</a>
    </nav>
    <a className="header-cta" href="/lien-he">Nhận tư vấn <span>↗</span></a>
  </header>;
}

export function Footer() {
  return <footer><a className="brand footer-brand" href="/">PIMA<span>INTERIOR</span></a><p>Giải pháp nội thất bền đẹp từ tấm nhựa PIMA.</p><div><a href="/san-pham">Sản phẩm</a><a href="/vat-lieu-pima">Vật liệu</a><a href="/doi-tac">Đối tác</a><a href="/lien-he">Liên hệ</a></div><small>© 2026 PIMA. Nội dung mang tính giới thiệu và tư vấn sản phẩm.</small></footer>;
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main><Header />{children}<Footer /></main>;
}

export function Consultation({ title = "Bạn đang muốn gia công sản phẩm nào?" }: { title?: string }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <section className="consult" id="tu-van">
    <div className="consult-copy"><p className="eyebrow light">Bắt đầu một không gian bền đẹp</p><h2>{title}</h2><p>Để lại thông tin, đội ngũ PIMA sẽ liên hệ tư vấn vật liệu và phương án phù hợp.</p></div>
    <form onSubmit={submit} className="consult-form">
      <label>Họ và tên<input required name="name" placeholder="Nhập họ và tên" /></label>
      <label>Số điện thoại<input required name="phone" inputMode="tel" placeholder="Nhập số điện thoại" /></label>
      <label>Sản phẩm quan tâm<select name="interest" defaultValue=""><option value="" disabled>Chọn sản phẩm</option>{productLinks.map(p => <option key={p.name}>{p.name}</option>)}<option>Tấm vật liệu cho xưởng</option></select></label>
      <button className="button ivory" type="submit">{sent ? "Đã ghi nhận thông tin ✓" : "Gửi yêu cầu tư vấn →"}</button>
    </form>
  </section>;
}

export type ProductDetail = {
  index: string; name: string; kicker: string; headline: string; intro: string; image: string;
  fit: string[]; strengths: [string, string][]; structure: [string, string][]; note: string;
};

export function ProductDetailPage({ product }: { product: ProductDetail }) {
  return <PageShell>
    <section className="detail-hero">
      <div className="detail-copy"><p className="breadcrumbs"><a href="/">Trang chủ</a> / <a href="/san-pham">Sản phẩm</a> / {product.name}</p><p className="eyebrow">{product.kicker}</p><h1>{product.headline}</h1><p>{product.intro}</p><div className="hero-actions"><a className="button primary" href="#tu-van">Nhận tư vấn <span>↗</span></a><a className="button ghost" href="#cau-tao">Xem cấu tạo</a></div></div>
      <div className="detail-image"><img src={product.image} alt={`Nội thất ${product.name} từ tấm nhựa PIMA`} /><span>{product.index}</span></div>
    </section>
    <section className="detail-summary"><p className="eyebrow">Giải pháp phù hợp</p><div className="summary-grid"><h2>Thiết kế theo không gian.<br /><em>Bền theo thời gian.</em></h2><ul>{product.fit.map(item => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="detail-benefits"><div><p className="eyebrow light">Ưu điểm nổi bật</p><h2>Lựa chọn thực tế cho<br />nhịp sống hiện đại</h2></div><div className="detail-benefit-grid">{product.strengths.map(([title, desc], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
    <section className="spec-section" id="cau-tao"><div><p className="eyebrow">Cấu tạo đề xuất</p><h2>Tối ưu từng lớp<br /><em>hoàn thiện</em></h2><p className="spec-note">{product.note}</p></div><div className="spec-list">{product.structure.map(([label, value], i) => <div key={label}><span>0{i + 1}</span><h3>{label}</h3><p>{value}</p></div>)}</div></section>
    <RelatedProducts current={product.name} />
    <Consultation title={`Tư vấn giải pháp ${product.name.toLowerCase()}`} />
  </PageShell>;
}

export function RelatedProducts({ current }: { current?: string }) {
  const items = productLinks.filter(p => p.name !== current);
  return <section className="related"><div className="section-heading"><div><p className="eyebrow">Khám phá thêm</p><h2>Các giải pháp<br /><em>cùng hệ PIMA</em></h2></div><a className="text-link" href="/san-pham">Xem tất cả sản phẩm <span>→</span></a></div><div className="related-grid">{items.slice(0,3).map(p => <a href={p.href} key={p.name}><img src={p.image} alt={p.name} /><span>{p.name} ↗</span></a>)}</div></section>;
}
