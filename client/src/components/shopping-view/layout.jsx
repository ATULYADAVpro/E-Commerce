import { Outlet } from "react-router-dom";

export default function ShoppingLayout() {
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            {/* common header */}
            {/* <ShoppingHeader /> */}
            <main className="flex flex-col w-full">
                <Outlet />
            </main>
        </div>
    )
}
