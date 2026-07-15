import { Consultation, PageShell } from "../components";
import { productLinks } from "../catalog-data";

const details = [
  ["Tủ bếp", "Giải pháp thùng – cánh – khoang chức năng cho khu vực nấu nướng thường xuyên tiếp xúc độ ẩm."],
  ["Tủ áo", "Hệ lưu trữ sạch, gọn, tối ưu theo chiều cao và thói quen sử dụng của từng gia đình."],
  ["Tủ lavabo", "Giải pháp gọn đẹp cho phòng tắm, linh hoạt theo đường ống và thiết bị vệ sinh."],
  ["Kệ & vách", "Kệ TV, tủ giày, vách ngăn và hệ trưng bày đồng bộ trong cùng một ngôn ngữ vật liệu."],
];

export default function Products(){return <PageShell>
  <section className="listing-hero"><p className="eyebrow">Sản phẩm nội thất PIMA</p><h1>Một hệ vật liệu.<br /><em>Nhiều không gian sống.</em></h1><p>Tấm nhựa PIMA được gia công thành các sản phẩm nội thất thiết thực, bền đẹp và phù hợp khí hậu nóng ẩm.</p></section>
  <section className="catalog-grid">{productLinks.map((p,i)=><a className="catalog-card" href={p.href} key={p.name}><div><img src={p.image} alt={p.name}/><span>0{i+1}</span></div><h2>{p.name}</h2><p>{details[i][1]}</p><b>Xem chi tiết ↗</b></a>)}</section>
  <section className="choice-guide"><div><p className="eyebrow light">Chọn đúng giải pháp</p><h2>Từ nhu cầu đến<br /><em>cấu hình phù hợp</em></h2></div><ol><li><span>01</span><h3>Xác định không gian</h3><p>Đo kích thước, vị trí thiết bị, khu vực ẩm và yêu cầu sử dụng.</p></li><li><span>02</span><h3>Chọn cấu hình tấm</h3><p>Độ dày, bề mặt và kết cấu được đề xuất theo từng sản phẩm.</p></li><li><span>03</span><h3>Chốt thiết kế</h3><p>Thống nhất công năng, màu sắc, phụ kiện và phương án thi công.</p></li></ol></section>
  <Consultation />
  </PageShell>}
