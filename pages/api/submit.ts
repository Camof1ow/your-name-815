// pages/api/submit.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface QueryParams {
    firstName: string;
    lastName: string;
    gender: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { firstName, lastName, gender }: QueryParams = req.query as any;

    try {
        // 실제 API 엔드포인트 URL로 변경하세요
        const apiResponse = await fetch(`http://localhost:8080/api/name?surName=${firstName}&lastName=${lastName}&gender=${gender}`);
        const data = await apiResponse.json();

        res.status(200).json(data);
    } catch (error) {
        console.error('Error in API handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
