// pages/api/like.js
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const csvFilePath = path.join(process.cwd(), 'like-count.csv');

export default function handler(req, res) {
    if (req.method === 'POST') {
        let count = 0;

        // CSV 파일이 존재하지 않으면 새로 생성
        if (!fs.existsSync(csvFilePath)) {
            fs.writeFileSync(csvFilePath, 'count\n0');
        }

        // CSV 파일을 읽어서 현재 카운트를 가져오기
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                count = parseInt(row.count, 10);
            })
            .on('end', () => {
                // 좋아요 카운트 증가
                count += 1;

                // CSV 파일 업데이트
                fs.writeFileSync(csvFilePath, `count\n${count}`);

                // 증가된 카운트를 클라이언트에 반환
                res.status(200).json({ count });
            });
    } else if (req.method === 'GET') {
        // GET 요청 시 현재 카운트를 반환
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                res.status(200).json({ count: parseInt(row.count, 10) });
            });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
