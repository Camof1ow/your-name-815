// components/Navigation.tsx
import Link from "next/link";

const Navigation = () => {
    return (
        <nav className="flex space-x-4 mb-6 overflow-x-auto">
        <Link href="/form" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        폼
        </Link>
        <Link href="/another-page" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        다른 페이지
    </Link>
    </nav>
);
};

export default Navigation;
