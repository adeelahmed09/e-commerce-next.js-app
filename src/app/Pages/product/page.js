import ProductPage from "@/app/Components/ProductPage";
import { Suspense } from "react";


export default function Page() {
    return (
        <Suspense fallback={<div>Loading product...</div>}>
            <ProductPage />
        </Suspense>
    )
}