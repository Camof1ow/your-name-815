// components/Footer.tsx
import React from 'react';
import { FaGithub } from 'react-icons/fa';

interface FooterProps {
    githubUrl: string;
}

const Footer: React.FC<FooterProps> = ({ githubUrl }) => {
    return (
        <footer className="w-full bg-gray-100 p-4 text-center">
            <button
                className="text-black hover:text-gray-400"
                onClick={() => window.open(githubUrl, '_blank')}
            >
                <FaGithub size={24} />
            </button>
        </footer>
    );
};

export default Footer;
