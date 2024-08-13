// pages/api/submit-post.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
    firstName: string;
    lastName: string;
    gender: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { firstName, lastName, gender }: RequestBody = req.body;

        try {
            const apiResponse = await fetch('http://localhost:8080/api/name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ surName: firstName, lastName, gender }),
            });
            const data = await apiResponse.json();

            res.status(200).json(data);
        } catch (error) {
            console.error('Error in POST API handler:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
