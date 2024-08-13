
import { redirect } from 'next/navigation';

export default function HomePage() {
    redirect('/myname'); // '/form' 경로로 리디렉션
    return null; // 렌더링할 내용이 없음
}
