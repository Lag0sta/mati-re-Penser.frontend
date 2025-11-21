import Quill from 'quill';
import DOMPurify from 'dompurify';

const BlockEmbed: any = Quill.import('blots/block/embed');

type ReplyValue = { quoteArr: { pseudo: string; text: string }[] };

const createNestedQuoteHTML = (quotes: ReplyValue['quoteArr']): string => {
  if (!quotes.length) return '';
console.log("quotesLength", quotes.length)
  const last = quotes[quotes.length - 1];
  const rest = quotes.slice(0, -1);
  
  const innerHTML = createNestedQuoteHTML(rest);
  console.log("last", last, "rest", rest, "innerHTML", innerHTML, "quotes", quotes);
  return `
    <div class="reply-quote-box">

      <div class="reply-quote-author"><strong>${DOMPurify.sanitize(last.pseudo)}</strong> a écrit :</div>
        <div class="reply-quote-body-wrapper-container">
          <div class="reply-quote-body-wrapper">
        ${innerHTML ? '<div class="reply-quote-line"></div>' : ''}
          ${innerHTML}
          </div>
          <div class="reply-quote-body">${DOMPurify.sanitize(last.text)}</div>
        </div>

    </div>
  `;
};

class ReplyQuoteBlot extends BlockEmbed {
  static blotName = 'replyQuote';
  static tagName = 'div';
  static className = 'ql-reply-quote';

  static create(value: ReplyValue) {
    const node = super.create() as HTMLElement;
    node.setAttribute('contenteditable', 'false');
    node.innerHTML = createNestedQuoteHTML(value.quoteArr);
    return node;
  }

  static value(node: HTMLElement): ReplyValue {
    // Récupère toutes les div reply-quote-box imbriquées
    const boxes = Array.from(node.querySelectorAll('.reply-quote-box'));
    const quoteArr = boxes.map(box => ({
      pseudo: box.querySelector('.reply-quote-author')?.textContent?.replace(' a écrit :', '') || '',
      text: box.querySelector('.reply-quote-body')?.innerHTML || ''
    }));
    return { quoteArr };
  }
}

Quill.register({ 'formats/replyQuote': ReplyQuoteBlot });
