import { Consultation, Footer, Header } from "./components";

const products = [
  { name: "Tủ bếp", tag: "Bền trong môi trường ẩm", image: "/images/kitchen.webp", href: "/san-pham/tu-bep.html" },
  { name: "Tủ áo", tag: "Sạch, đẹp và không mối mọt", image: "/images/wardrobe.webp", href: "/san-pham/tu-ao.html" },
  { name: "Tủ lavabo", tag: "An tâm ở khu vực thường xuyên có nước", image: "/images/vanity.webp", href: "/san-pham/tu-lavabo.html" },
];

const benefits = [
  ["01", "Chống nước", "Cốt nhựa phù hợp các khu vực bếp, lavabo và khí hậu nóng ẩm."],
  ["02", "Chống mối mọt", "Giải pháp nội thất bền vững, không lo côn trùng phá hại như vật liệu gỗ thông thường."],
  ["03", "Dễ vệ sinh", "Bề mặt phẳng, sạch, dễ lau chùi và phù hợp cho nhịp sống hiện đại."],
  ["04", "Gia công linh hoạt", "Cắt, khoan, bắt vít và hoàn thiện nhiều kiểu bề mặt theo thiết kế."],
];

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Nội thất từ tấm nhựa PIMA</p>
          <h1>Bền đẹp từ <em>cốt vật liệu</em></h1>
          <p className="hero-lead">Từ tủ bếp, tủ áo đến tủ lavabo và hệ kệ – vách: một hệ vật liệu chống nước, chống mối mọt, dễ vệ sinh và linh hoạt theo từng thiết kế.</p>
          <div className="hero-actions">
            <a className="button primary" href="/san-pham.html">Khám phá sản phẩm <span>→</span></a>
            <a className="button ghost" href="/lien-he.html">Nhận tư vấn</a>
          </div>
          <div className="category-row" aria-label="Danh mục sản phẩm">
            {[['Tủ bếp','/san-pham/tu-bep'], ['Tủ áo','/san-pham/tu-ao'], ['Tủ lavabo','/san-pham/tu-lavabo'], ['Kệ & vách','/san-pham/ke-vach']].map(([item, href], i) => <a href={href} key={item}><b>0{i + 1}</b>{item}</a>)}
          </div>
        </div>
        <div className="hero-gallery" aria-label="Không gian nội thất PIMA">
          <figure className="gallery-main"><img src="/images/kitchen.webp" alt="Không gian tủ bếp màu kem và gỗ walnut" /><figcaption><span>01</span> Bếp & phòng ăn</figcaption></figure>
          <figure className="gallery-small gallery-wardrobe"><img src="/images/wardrobe.webp" alt="Tủ áo âm tường hiện đại" /><figcaption><span>02</span> Phòng ngủ</figcaption></figure>
          <figure className="gallery-small gallery-vanity"><img src="/images/vanity.webp" alt="Tủ lavabo chống nước" /><figcaption><span>03</span> Phòng tắm</figcaption></figure>
        </div>
      </section>

      <section className="intro" id="vat-lieu">
        <p className="eyebrow">Vật liệu tạo nên khác biệt</p>
        <div className="intro-grid">
          <h2>Nội thất đẹp cần bắt đầu từ một <em>nền tảng bền.</em></h2>
          <div><p>Tấm nhựa PIMA giúp giải quyết những nỗi lo thường gặp của nội thất trong môi trường nóng ẩm: nước, mối mọt và việc vệ sinh hằng ngày.</p><a className="text-link" href="/vat-lieu-pima.html">Tìm hiểu vật liệu <span>→</span></a></div>
        </div>
        <div className="benefit-grid">
          {benefits.map(([no, title, desc]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </section>

      <section className="product-section" id="san-pham">
        <div className="section-heading"><div><p className="eyebrow">Bộ sưu tập ứng dụng</p><h2>Từ tấm PIMA đến<br /><em>không gian hoàn thiện</em></h2></div><p>Mỗi sản phẩm được phát triển theo nhu cầu sử dụng thực tế, tối ưu công năng, kích thước và bề mặt hoàn thiện.</p></div>
        <div className="product-grid">
          {products.map((p, i) => <article className="product-card" key={p.name}><div className="product-image"><img src={p.image} alt={p.name} /><span>0{i + 1}</span></div><h3>{p.name}</h3><p>{p.tag}</p><a href={p.href} aria-label={`Xem chi tiết ${p.name}`}>Xem giải pháp <span>↗</span></a></article>)}
        </div>
      </section>

      <section className="process" id="khong-gian">
        <div><p className="eyebrow light">Gia công theo yêu cầu</p><h2>Một quy trình rõ ràng.<br /><em>Một kết quả vừa vặn.</em></h2></div>
        <ol><li><span>01</span><div><h3>Tiếp nhận nhu cầu</h3><p>Không gian, kích thước, phong cách và ngân sách.</p></div></li><li><span>02</span><div><h3>Đề xuất vật liệu</h3><p>Chọn cốt tấm, màu sắc và bề mặt phù hợp.</p></div></li><li><span>03</span><div><h3>Gia công & hoàn thiện</h3><p>Sản xuất theo bản vẽ và kiểm soát chất lượng.</p></div></li></ol>
      </section>

      <section className="partner" id="doi-tac">
        <div><p className="eyebrow">Dành cho xưởng & đối tác</p><h2>Chủ động vật liệu.<br /><em>Mở rộng sản phẩm.</em></h2></div>
        <div><p>PIMA cung cấp tấm ván nhựa và giải pháp vật liệu cho xưởng nội thất, nhà phân phối, đơn vị thiết kế – thi công và dự án.</p><ul><li>Nguồn hàng từ nhà sản xuất</li><li>Đa dạng độ dày và bề mặt</li><li>Hỗ trợ mẫu, kỹ thuật và chính sách theo sản lượng</li></ul><a className="button primary" href="/doi-tac.html">Trở thành đối tác <span>→</span></a></div>
      </section>
      <Consultation />
      <Footer />
    </main>
  );
}
