// app/layout.tsx
import { GlobalProvider } from '@/context/GlobalContext'; // 경로를 맞게 설정
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: '내 이름과 비슷한 독립운동가 찾기',
    description: '당신의 이름과 비슷한 독립운동가를 찾아보세요. 한국의 역사와 당신을 연결하는 특별한 경험을 제공합니다.',
    keywords: '독립운동가, 한국 역사, 이름 찾기, 역사 교육, 광복절',
    authors: [{ name: 'Jiman Jeon' }],
    openGraph: {
        title: '내 이름과 비슷한 독립운동가 찾기',
        description: '당신의 이름과 비슷한 독립운동가를 찾아보세요. 한국의 역사와 당신을 연결하는 특별한 경험을 제공합니다.',
        url: 'https://yourname815.vercel.app/',
        siteName: '독립운동가 이름 찾기',
        images: [
            {
                url: 'https://yourname815.vercel.app/815.jpg',
                width: 1200,
                height: 630,
                alt: '독립운동가 이름 찾기 서비스 이미지',
            },
        ],
        locale: 'ko_KR',
        type: 'website',
    },
    robots: 'index, follow',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <GlobalProvider>
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                    {children}
                </main>
                <Footer githubUrl="https://github.com/Camof1ow"
                githubUrl2={`https://github.com/Kang-YongHo`}/>
            </div>
        </GlobalProvider>
        </body>
        </html>
    );
}