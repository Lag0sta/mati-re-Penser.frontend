// import { useEffect, useRef } from 'react';
// import DOMPurify from 'dompurify';

// import '../quill/registerReplyBot.js'
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import '../styles/TextEditors.css';

// interface ReplyData {
//   author: string;
//   text: string;
//   id: string;
//   quoteArr?: { author: string; text: string; id: string }[];
// }

// interface TextEditorProps {
//   rQValue: string;
//   setRQValue: (value: string) => void;
//   replyTo?: ReplyData | null;   
//     setReplyTo?: (value: ReplyData | null) => void; // <-- ici

//   onInserted?: (id: string) => void; 
//   setQuoteID?: (value: string[]) => void;

// }

// function TextEditor({ rQValue, setRQValue, replyTo, onInserted, setQuoteID, setReplyTo  }: TextEditorProps) {
//   const quillRef = useRef<ReactQuill>(null);
//   const hasInsertedRef = useRef(false);

//   // -------------------------
//   // 1. Insertion des quotes
//   // -------------------------
//   useEffect(() => {
//     if (!quillRef.current || !replyTo) {
//       hasInsertedRef.current = false;
//       return;
//     }
//     console.log('replyToTextEditor', replyTo)
//     if (hasInsertedRef.current) return;
//     hasInsertedRef.current = true;

//     const quill = quillRef.current.getEditor();

//     // Supprime l'ancien blot ReplyQuote si existant
//     const delta = quill.getContents();
//     const ops = delta.ops?.filter((op: any) => !(op.insert && op.insert.replyQuote)) ?? [];
//     quill.setContents({ ops });

//     const safeQuoteArr = (replyTo.quoteArr || []).map(q => ({
//       author: DOMPurify.sanitize(q.author),
//       text: DOMPurify.sanitize(q.text),
//       id: DOMPurify.sanitize(q.id)
//     }));

//     // Vide le contenu pour insérer les nouvelles citations
//     quill.setContents([]);
//     quill.insertEmbed(0, 'replyQuote', { quoteArr: safeQuoteArr });
//     quill.insertText(1, '\n', 'user');

//     // Place le curseur après le dernier bloc
//     const cursorPos = safeQuoteArr.length > 0 ? safeQuoteArr.length * 2 : 0;
//     quill.setSelection(cursorPos, 0, 'user');
//     quill.focus();

//     // Callback après insertion
//     if (replyTo.quoteArr && replyTo.quoteArr.length > 0) {
//       onInserted?.(replyTo.quoteArr[replyTo.quoteArr.length - 1].id);
//     }

//     // Met à jour les quoteID après insertion initiale
//     if (setQuoteID) {
//       setQuoteID(safeQuoteArr.map(q => q.id));
//     }

//   }, [replyTo, onInserted, setQuoteID]);

//   // -------------------------
//   // 2. Mettre à jour les quoteID à chaque changement de texte
//   // -------------------------
//   useEffect(() => {
//     if (!quillRef.current || !setQuoteID) return;
//     const quill = quillRef.current.getEditor();

//     const handleChange = () => {
//       const editor = quill.root;
//       const quoteDivs = Array.from(editor.querySelectorAll('.reply-quote-box[data-quote-id]'));
//       const ids = quoteDivs.map(div => (div as HTMLElement).dataset.quoteId || '');
//       setQuoteID(ids);
//     };

//     quill.on('text-change', handleChange);
//     return () => {
//       quill.off('text-change', handleChange);
//     };
//   }, [setQuoteID]);

//   return (
//     <div className="w-full bg">
//       <ReactQuill
//         ref={quillRef}
//         theme="snow"
//         value={rQValue}
//         onChange={setRQValue}
//         className="my-editor"
//       />
//     </div>
//   );
// }

// export default TextEditor;

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
}

function TextEditor({ rQValue, setRQValue, replyTo, onInserted }: TextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
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