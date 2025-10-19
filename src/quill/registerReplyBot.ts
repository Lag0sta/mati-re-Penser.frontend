import Quill from 'quill';
import DOMPurify from 'dompurify';

const BlockEmbed: any = Quill.import('blots/block/embed');

type ReplyValue = { author: string; text: string };

class ReplyQuoteBlot extends BlockEmbed {
  static blotName = 'replyQuote';
  static tagName = 'div';
  static className = 'ql-reply-quote';

  static create(value: ReplyValue) {
    const node = super.create() as HTMLElement;
    node.dataset.author = value.author;
    node.dataset.text = value.text;

    const safeAuthor = DOMPurify.sanitize(value.author);
    const safeText = DOMPurify.sanitize(value.text);

    node.setAttribute('contenteditable', 'false');

    node.innerHTML = `
      <div class="ql-reply-quote reply-quote" contenteditable="false">
  <div class="reply-quote-box">
    <div class="reply-quote-author"><strong>${safeAuthor}</strong> <span class="light">a écrit :</span></div>
    <div class="reply-quote-body-wrapper">
      <div class="reply-quote-line"></div>
      <div class="reply-quote-body">${safeText}</div>
    </div>
  </div>
</div>

    `;
    return node;
  }

  static value(node: HTMLElement): ReplyValue {
    return {
      author: node.dataset.author ?? '',
      text: node.dataset.text ?? '',
    };
  }
}

// ✅ Passer un objet pour éviter les erreurs TS
Quill.register({ 'formats/replyQuote': ReplyQuoteBlot });
