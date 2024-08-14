// pages/api/submit-get.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface QueryParams {
    firstName: string;
    lastName: string;
    gender: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { firstName, lastName, gender }: QueryParams = req.query as any;

    try {
        const apiResponse = await fetch(`${process.env.BE_API_URL}/api/name?surName=${firstName}&lastName=${lastName}&gender=${gender}`);
        const data = await apiResponse.json();

        res.status(200).json(data);
    } catch (error) {
        console.error('Error in GET API handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}