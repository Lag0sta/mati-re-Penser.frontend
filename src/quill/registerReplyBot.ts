// import Quill from 'quill';
// import DOMPurify from 'dompurify';

// const BlockEmbed: any = Quill.import('blots/block/embed');

// type ReplyValue = {
//   quoteArr: { author: string; text: string; id?: string }[];
// };
// type QuoteItem = { author: string; text: string; id: string };

// class ReplyQuoteBlot extends BlockEmbed {
//   static blotName = 'replyQuote';
//   static tagName = 'div';
//   static className = 'ql-reply-quote';

//   static create(value: ReplyValue) {
//   const node = super.create() as HTMLElement;

//   node.setAttribute('contenteditable', 'false');

//   // sécurité sur quoteArr
//   const quoteArr = Array.isArray(value.quoteArr) ? (value.quoteArr.filter((q): q is QuoteItem => !!q.id)) : [];
//   console.log("quoteArr", quoteArr);

//   // ✅ empêcher doublons d'id
//   const unique = quoteArr.filter(
//     (q, i, arr) => arr.findIndex(x => x.id === q.id) === i
//   );

//   // fonction récursive pour imbriquer les quotes
//   const createNestedQuotes = (quotes: QuoteItem[], level = 0): string => {
//     if (quotes.length === 0) return '';

//     const last = quotes[quotes.length - 1];  // dernière quote (la plus récente)
//     // const rest = quotes.slice(0, -1);        // toutes les autres quotes

//     const [first, ...rest] = quotes; // prend la première quote au lieu de la dernière

//     const safeAuthor = DOMPurify.sanitize(first.author);
//     const safeText = DOMPurify.sanitize(first.text);
//     const safeId = DOMPurify.sanitize(first.id);

//     //     const safeAuthor = DOMPurify.sanitize(value.author);
//     // const safeText = DOMPurify.sanitize(value.text);

//     console.log("safeAuthor :", safeAuthor, "safeText :", safeText, "safeId :", safeId);

//     let innerHTML = rest.length > 0 ? createNestedQuotes(rest, level + 1) : '';

//         // node.setAttribute('contenteditable', 'false');


//     return `
//       <div class="reply-quote-box level-${level}" data-quote-id="${safeId}">
//         <div class="reply-quote-author"><strong>${safeAuthor}</strong> a écrit :</div>
//         ${innerHTML}
//         <div class="reply-quote-body-wrapper">
//           <div class="reply-quote-line"></div>
//           <div class="reply-quote-body">${safeText}</div>
//         </div>
//       </div>
//     `;
//   };

// //     node.innerHTML = `
// //       <div class="ql-reply-quote reply-quote" contenteditable="false">
// //   <div class="reply-quote-box">
// //     <div class="reply-quote-author"><strong>${safeAuthor}</strong> <span class="light">a écrit :</span></div>
// //     <div class="reply-quote-body-wrapper">
// //       <div class="reply-quote-line"></div>
// //       <div class="reply-quote-body">${safeText}</div>
// //     </div>
// //   </div>
// // </div>

// //     `;

//   const quoteHTML = createNestedQuotes(unique);

//   node.innerHTML = quoteHTML;
//   return node;
// }

//   static value(node: HTMLElement): ReplyValue {
//     const quoteDivs = Array.from(node.querySelectorAll('.reply-quote-box'));
//     const quoteArr = quoteDivs.map((div) => ({
//       author: div.querySelector('.reply-quote-author')?.textContent?.replace(' a écrit :', '') || '',
//       text: div.querySelector('.reply-quote-body')?.innerHTML || '',
//       id: div.getAttribute('data-quote-id') || '' // <-- ✅ Ajout essentiel

//     }));

//     // ✅ filtrer les vides et doublons
//     const unique = quoteArr.filter(
//   (q, i, arr) => arr.findIndex(x => x.id === q.id) === i
// );

//     return { quoteArr: unique };
//   }
// }

// Quill.register({ 'formats/replyQuote': ReplyQuoteBlot });

import Quill from 'quill';
import DOMPurify from 'dompurify';

const BlockEmbed: any = Quill.import('blots/block/embed');

type ReplyValue = { quoteArr: { pseudo: string; text: string }[] };

const createNestedQuoteHTML = (quotes: ReplyValue['quoteArr']): string => {
  if (!quotes.length) return '';

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
