// import { useEffect, useMemo, useState } from "react";
// import { useAppSelector, useAppDispatch } from "../store/hooks.js";

// import TextEditor from "./TextEditor.js";
// import { editCommentInfo } from "../store/reducers/topic.js";
// import { editCommentRequest } from "../utils/threadActions.js";

// import { modalProps, msgProps } from "../types/Props.js";

// interface props {
//   replyTo: any;
//   setReplyTo: (value: any) => any;
//   setMainComponent?: (value: string) => any;
//   modalProps : modalProps;
//   msgProps : msgProps;
// }

// export default RenderNestedQuotes = () => {
//   const dispatch = useAppDispatch();

//   const comment: any = useAppSelector((state) => (state as any).comment?.value ?? {});
//   const topic: any = useAppSelector((state) => (state as any).topic?.value ?? {});
//   const token: string | undefined = useAppSelector((state) => (state as any).authToken?.value);

//   const [originalValue, setOriginalValue] = useState<string>(comment?.text ?? "");
//   const [rQValue, setRQValue] = useState<string>(comment?.text ?? "");

//   useEffect(() => {
//     setOriginalValue(comment?.text ?? "");
//     setRQValue(comment?.text ?? "");
//   }, [comment?.id]);



//   const [showAllQuotes, setShowAllQuotes] = useState(false);

//   const renderNestedQuotes = (quotes: any[]): JSX.Element | null => {
//     if (!quotes || quotes.length === 0) return null;
//     const last = quotes[quotes.length - 1];
//     const rest = quotes.slice(0, -1);

//     if (last && (last as any).__ellipsis) {
//       return (
//         <div
//           key="ellipsis"
//           className="w-full flex flex-row items-center justify-start text-gray-500 text-xs italic cursor-pointer hover:text-gray-300 transition"
//           onClick={() => setShowAllQuotes(true)}
//         >
//           <span>…</span>
//         </div>
//       );
//     }

//     return (
//       <div
//         key={last.id}
//         className="w-full flex flex-col justify-start items-start p-2 border-[3px] border-gray-600 rounded-sm text-gray-400 text-md box-border"
//       >
//         <span className="font-semibold text-gray-400 underline underline-offset-2 mb-1">
//           <span className="font-semibold text-gray-200">{last?.createdBy?.pseudo}</span> a écrit :
//         </span>

//         <div className="flex flex-row gap-2 items-start w-full">
//           <div className="w-[2px] bg-gray-500 rounded self-stretch" />
//           <div className="flex flex-col flex-1 gap-2">
//             {rest.length > 0 && <div className="flex flex-col gap-2">{renderNestedQuotes(rest)}</div>}
//             <span className="text-xs text-gray-300">{(last?.text ?? "").replace(/<[^>]+>/g, "")}</span>
//           </div>
//         </div>
//       </div>
//     );
//   };
// }
