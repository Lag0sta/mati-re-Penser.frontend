import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

import '../quill/registerReplyBot.js'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../styles/TextEditors.css';

interface ReplyData {
  author: string;
  text: string;
}

interface TextEditorProps {
  rQValue: string;
  setRQValue: (value: string) => void;
  replyTo?: ReplyData | null;         // données pour insérer une citation
  setReplyTo?: (value: ReplyData | null) => void;
  onInserted?: () => void;            // callback après insertion
}

function TextEditor({ rQValue, setRQValue, replyTo, onInserted }: TextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (!replyTo || !quillRef.current) return;
    console.log("replyToTextEditor", replyTo)
    console.log("rQValueTextEditor", rQValue)
    const quill = quillRef.current.getEditor();

    // Supprime l'ancien blot ReplyQuote si existant
    const delta = quill.getContents();
    const ops = delta.ops?.filter(op => !(op.insert && op.insert.replyQuote)) ?? [];
    quill.setContents({ ops });
    console.log("quill", quill)
    // Sanitize les données
    const safeAuthor = DOMPurify.sanitize(replyTo.author);
    const safeText = DOMPurify.sanitize(replyTo.text);

    quill.setContents([]); // vide si tu veux remplacer l'ancien blot
    quill.insertEmbed(0, 'replyQuote', { author: safeAuthor, text: safeText });
    quill.insertText(1, '\n', 'user'); // ligne vide pour continuer à écrire
    quill.setSelection(2, 0, 'user');

    // Position d'insertion : début du texte
    const index = 0;

    

    // Place le curseur après le bloc
    quill.setSelection(index + 2, 0, 'user');
    quill.focus();

    // Callback pour informer le parent que l'insertion est faite
    onInserted?.();
  }, [replyTo, onInserted]);

  return (
    <div className="w-full bg">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={rQValue}
        onChange={setRQValue}
        className="bg-gray-200"
      />
    </div>
  );
}

export default TextEditor;
