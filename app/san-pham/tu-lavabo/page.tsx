import CmsProductPage from "../../CmsProductPage";
import { productData } from "../../product-data";
export default function Page(){ return <CmsProductPage slug="tu-lavabo" fallback={productData["tu-lavabo"]} />; }
