import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

import '../quill/registerReplyBot.js'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../styles/TextEditors.css';

interface ReplyData {
  pseudo: string;
  text: string;
  quoteArr?: { pseudo: string; text: string }[];
}

interface TextEditorProps {
  rQValue: string;
  setRQValue: (value: string) => void;
  replyTo?: ReplyData | null;         // données pour insérer une citation
  setReplyTo?: (value: ReplyData | null) => void;
  onInserted?: () => void;            // callback après insertion
  mode?: 'editComment' | 'reply' | 'editTopic';
}

function TextEditor({ rQValue, setRQValue, replyTo, onInserted, mode }: TextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
     if (mode === 'editComment' || mode === 'editTopic') {
      // On est en édition, ne pas insérer de quote
      return;
    }
  if (!replyTo || !quillRef.current) return;
  const quill = quillRef.current.getEditor();
console.log("replyToTextEditor", replyTo)

  // Supprime l'ancien blot ReplyQuote si existant
  const delta = quill.getContents();
  const ops = delta.ops?.filter((op: any) => !(op.insert && op.insert.replyQuote)) ?? [];
  quill.setContents({ ops });

   // replyTo peut déjà être un tableau de citations
  const previousQuotes = Array.isArray(replyTo) ? replyTo : [];

  /// Sanitize toutes les citations existantes
  const safeQuoteArr = previousQuotes.map(q => ({
    pseudo: DOMPurify.sanitize(q.pseudo),
    text: DOMPurify.sanitize(q.text),
  }));

  console.log("safeQuoteArr", safeQuoteArr)

  // // Ajoute la dernière citation ciblée
  // safeQuoteArr.push({
  //   pseudo: DOMPurify.sanitize(replyTo.pseudo),
  //   text: DOMPurify.sanitize(replyTo.text),
  // });

  // Vide le contenu et insère le blot avec toutes les quotes
  quill.setContents([]);
  quill.insertEmbed(0, 'replyQuote', { quoteArr: safeQuoteArr });

  // Ligne vide après le bloc pour continuer à écrire
  quill.insertText(safeQuoteArr.length * 2, '\n', 'user');

  // Place le curseur après le bloc
  quill.setSelection(safeQuoteArr.length * 2 + 1, 0);
  quill.focus();

  onInserted?.();
}, [replyTo, onInserted]);

  return (
    <div className="w-full bg">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={rQValue}
        onChange={setRQValue}
        className="my-editor"

      />
    </div>
  );
}

export default TextEditor;