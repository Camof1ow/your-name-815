import React, { useState, useEffect } from 'react';

const LikeButton: React.FC = () => {
    const [likeCount, setLikeCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        // 처음 로드 시 좋아요 카운트를 가져옴
        fetch('/api/like')
            .then((response) => response.json())
            .then((data) => setLikeCount(data.count));
    }, []);

    const handleLike = () => {
        if (!isLiked) {
            // 좋아요 버튼이 클릭되었을 때 API 호출
            fetch('/api/like', { method: 'POST' })
                .then((response) => response.json())
                .then((data) => {
                    setLikeCount(data.count);
                    setIsLiked(true);
                });
        }
    };

    return (
        <div className="flex items-center justify-center mt-4">
            <span className="font-bold my-2 text-pink-400">좋아요를 눌러 응원해주세요</span>

            <button
                className={`p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={handleLike}
            >
                👍 {likeCount}
            </button>
        </div>
    );
};

export default LikeButton;