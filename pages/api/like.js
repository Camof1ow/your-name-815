// pages/api/like.js
const API_URL = process.env.BE_API_URL; // 환경변수에서 API URL을 가져옵니다

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            // 외부 API에 POST 요청하여 좋아요 카운트 증가
            const response = await fetch(`${API_URL}/like`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to update like count');
            }

            // 응답 데이터 파싱
            const text = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const count = xmlDoc.getElementsByTagName('likeCount')[0]?.textContent;

            res.status(200).json({ count: parseInt(count, 10) || 0 });
        } else if (req.method === 'GET') {
            // 외부 API에 GET 요청하여 현재 좋아요 수를 가져옴
            const response = await fetch(`${API_URL}/like`);

            if (!response.ok) {
                throw new Error('Failed to fetch like count');
            }

            // 응답 데이터 파싱
            const text = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const count = xmlDoc.getElementsByTagName('likeCount')[0]?.textContent;

            res.status(200).json({ count: parseInt(count, 10) || 0 });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
