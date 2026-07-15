"use client";

import { useEffect, useState } from "react";
import { Consultation, PageShell, ProductDetail, RelatedProducts } from "./components";
import { CmsProduct, getProduct } from "./lib/pima-api";
import styles from "./cms.module.css";

export default function CmsProductPage({ slug, fallback }: { slug: string; fallback: ProductDetail }) {
  const [cms, setCms] = useState<CmsProduct | null>(null);
  useEffect(() => { getProduct(slug).then(setCms).catch(() => setCms(null)); }, [slug]);
  const name = cms?.name || fallback.name;
  const image = cms?.cover_image_url || fallback.image;
  const intro = cms?.summary || cms?.description || fallback.intro;
  const fits = cms?.applications?.length ? cms.applications : fallback.fit;
  const strengths: [string, string][] = cms?.features?.length ? cms.features.map((title, i) => [title, "Ưu điểm của giải pháp nội thất gia công từ tấm nhựa PIMA."]) : fallback.strengths;

  return <PageShell>
    <section className="detail-hero">
      <div className="detail-copy"><p className="breadcrumbs"><a href="/">Trang chủ</a> / <a href="/san-pham.html">Sản phẩm</a> / {name}</p><p className="eyebrow">{cms?.tagline || fallback.kicker}</p><h1>{name}</h1><p>{intro}</p><div className="hero-actions"><a className="button primary" href="#tu-van">Nhận tư vấn <span>↗</span></a><a className="button ghost" href="#cau-tao">Xem cấu tạo</a></div></div>
      <div className="detail-image"><img src={image} alt={`Nội thất ${name} từ tấm nhựa PIMA`} /><span>{fallback.index}</span></div>
    </section>
    {cms?.video_url && <section className={styles.videoSection}><p className="eyebrow">Video giới thiệu</p><video controls preload="metadata" poster={image} src={cms.video_url}>Trình duyệt không hỗ trợ video.</video></section>}
    {!!cms?.gallery?.length && <section className={styles.gallery}><p className="eyebrow">Hình ảnh sản phẩm</p><div>{cms.gallery.map((item, i) => item.type === "video" ? <video controls key={i} src={item.url}/> : <img key={i} src={item.url} alt={item.alt || `${name} ${i + 1}`}/>)}</div></section>}
    <section className="detail-summary"><p className="eyebrow">Giải pháp phù hợp</p><div className="summary-grid"><h2>Thiết kế theo không gian.<br /><em>Bền theo thời gian.</em></h2><ul>{fits.map(item => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="detail-benefits"><div><p className="eyebrow light">Ưu điểm nổi bật</p><h2>Lựa chọn thực tế cho<br />nhịp sống hiện đại</h2></div><div className="detail-benefit-grid">{strengths.map(([title, desc], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
    <section className="spec-section" id="cau-tao"><div><p className="eyebrow">Cấu tạo đề xuất</p><h2>Tối ưu từng lớp<br /><em>hoàn thiện</em></h2><p className="spec-note">{cms?.description || fallback.note}</p></div><div className="spec-list">{fallback.structure.map(([label, value], i) => <div key={label}><span>0{i + 1}</span><h3>{label}</h3><p>{value}</p></div>)}</div></section>
    <RelatedProducts current={fallback.name}/><Consultation title={`Tư vấn giải pháp ${name.toLowerCase()}`}/>
  </PageShell>;
}
