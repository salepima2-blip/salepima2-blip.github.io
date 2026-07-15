import CmsProductPage from "../../CmsProductPage";
import { productData } from "../../product-data";
export default function Page(){ return <CmsProductPage slug="tu-ao" fallback={productData["tu-ao"]} />; }
