import React, {useState, useEffect} from 'react';

const API_URL = '/backend/api/like'; // Next.js API 라우트 경로

const LikeButton = () => {
    const [likeCount, setLikeCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    // 초기 로드 시 현재 좋아요 수 가져오기
    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                const response = await fetch(`${API_URL}/count`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setLikeCount(data["contents"].likeCount);

            } catch (error) {
                setError('Failed to fetch like count');
            } finally {
                setLoading(false);
            }
        };

        fetchLikeCount();
    }, []);

    // 좋아요 클릭 핸들러
    const handleLikeClick = async () => {
        try {
            const response = await fetch(`${API_URL}/up`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setLikeCount(data["contents"].likeCount);
        } catch (error) {
            setError('Failed to update like count');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col items-center justify-center mt-4">

            <button
                className={`p-3 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={handleLikeClick}
            >
                👍 {likeCount}
            </button>
            <span className="font-bold my-4 text-pink-400">좋아요를 눌러 응원해주세요</span>

        </div>
    );
};


export default LikeButton;
