import React from 'react';
import DOMPurify from 'dompurify';

interface QuoteBlockProps {
  author: string;
  text: string;
  // optionnel : tu peux ajouter un id si tu veux un lien vers le commentaire
  id?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ author, text, id }) => {
  return (
    <div
      className="bg-gray-100 border-l-4 border-gray-800 p-2 mb-2 rounded-md"
      data-quote-id={id}
    >
      <div className="font-bold text-gray-700 mb-1">{author} a écrit :</div>
      <div
        className="text-gray-800"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
      />
    </div>
  );
};

export default QuoteBlock;
