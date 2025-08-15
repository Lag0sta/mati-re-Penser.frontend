import { useState, } from 'react';
// import ReactQuill from 'react-quill';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../styles/TextEditors.css';

interface TextEditorProps {
    newComment: string;
    setNewComment: (value: string) => void;
}

function TextEditor({newComment, setNewComment}: TextEditorProps) {
   return (
    <div className="w-full bg">
      <ReactQuill
        theme="snow"
        value={newComment}
        onChange={setNewComment}
        className="bg-gray-200 "
      />
    </div>
  );
}

export default TextEditor;
