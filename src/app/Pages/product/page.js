import ProductPage from "@/app/Components/ProductPage";
import { Suspense } from "react";


export default function Page() {
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useState(
        {

        }
    )
    useEffect(() => {
        if (status === "authenticated") {
            setUserDetails({
                name: session.user.name,
                email: session.user.email,
                avatar: session.user.avatar,
                role: session.user.role,
                id: session.user.id
            })
        }
    }, [status]);
    return (
        <Suspense fallback={<div>Loading product...</div>}>
            <ProductPage />
        </Suspense>
    )
}