import CmsProductPage from "../../CmsProductPage";
import { productData } from "../../product-data";
export default function Page(){ return <CmsProductPage slug="ke-vach" fallback={productData["ke-vach"]} />; }
