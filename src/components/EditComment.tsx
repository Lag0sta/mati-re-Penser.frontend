import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks.js";

import TextEditor from "./TextEditor.js";
import { editCommentInfo } from "../store/reducers/topic.js";
import { editComment } from "../utils/threadActions.js";

interface CommentProps {
  replyTo: any;
  setReplyTo: (value: any) => any;
  setMainComponent?: (value: string) => any;
  setModalComponent: (value: string) => any;
  modalComponent?: string;
  setIsModalOpen?: (value: boolean) => any;
  setIsEditModalOpen: (value: boolean) => any;
  setErrorMessage: (value: string) => any;
  setSuccessMessage: (value: string) => any;
  setIsMessageModalOpen: (value: boolean) => any;
}

export default function EditComment({
  replyTo,
  setReplyTo,
  setModalComponent,
  setErrorMessage,
  setIsEditModalOpen,
  setSuccessMessage,
  setIsMessageModalOpen,
}: CommentProps) {
  const dispatch = useAppDispatch();

  // selectors
  const comment: any = useAppSelector((state) => (state as any).comment?.value ?? {});
  const topic: any = useAppSelector((state) => (state as any).topic?.value ?? {});
  const token: string | undefined = useAppSelector((state) => (state as any).authToken?.value);

  // local state for editor values — initialize from comment, and keep synced when comment changes
  const [originalValue, setOriginalValue] = useState<string>(comment?.text ?? "");
  const [rQValue, setRQValue] = useState<string>(comment?.text ?? "");

  useEffect(() => {
    // when comment changes (new id or text), update local editor state
    setOriginalValue(comment?.text ?? "");
    setRQValue(comment?.text ?? "");
  }, [comment?.id]);

  // threads list from topic slice
  const topicThreads: any[] = Array.isArray(topic?.topicThread) ? topic.topicThread : [];

  // quoted threads (deduplicated, in order) — comment.quote is expected to be an array of ids
  const quotedThreads = useMemo(() => {
    const ids: string[] = Array.isArray(comment?.quote) ? comment.quote : [];
    const mapped = ids
      .map((id) => topicThreads.find((t: any) => t?.id === id))
      .filter(Boolean) as any[];

    // remove duplicates while preserving order
    const unique: any[] = [];
    const seen = new Set<string>();
    for (const q of mapped) {
      if (q && !seen.has(q.id)) {
        seen.add(q.id);
        unique.push(q);
      }
    }
    return unique;
  }, [comment?.quote, topicThreads]);

  // show/hide all quotes (hook must be top-level)
  const [showAllQuotes, setShowAllQuotes] = useState(false);

  // compute displayQuotes (with ellipsis marker object to keep types consistent)
  const displayQuotes = useMemo(() => {
    if (showAllQuotes || quotedThreads.length <= 4) return quotedThreads;
    return [
      ...quotedThreads.slice(0, 2),
      { __ellipsis: true },
      ...quotedThreads.slice(-2),
    ];
  }, [quotedThreads, showAllQuotes]);

  // handle submit edit
  const handleEditComment = async () => {
    if (!token) {
      setErrorMessage("Vous devez être connecté pour modifier un commentaire.");
      setIsMessageModalOpen(true);
      return;
    }

    const text = rQValue;
    const id = comment?.id;

    if (!id) {
      setErrorMessage("Aucun commentaire sélectionné.");
      setIsMessageModalOpen(true);
      return;
    }

    const threadData = { token, text, id };

    try {
      const editCommentResponse = await editComment({ threadData });

      if (!editCommentResponse?.result) {
        setErrorMessage(editCommentResponse?.message ?? "Erreur lors de la modification");
        setIsMessageModalOpen(true);
        return;
      }

      // update topic slice with edited comment
      console.log("editCommentResponse", editCommentResponse);
dispatch(editCommentInfo({ id: editCommentResponse.editedComment._id, text: editCommentResponse.editedComment.text }));
      setSuccessMessage(editCommentResponse.message ?? "Commentaire modifié");
      setIsMessageModalOpen(true);
      setIsEditModalOpen(false);
      setModalComponent("");
    } catch (err: any) {
      setErrorMessage(err?.message ?? String(err));
      setIsMessageModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalComponent("");
    setIsEditModalOpen(false);
  };

  // helper to render nested quotes recursively
  const renderNestedQuotes = (quotes: any[]): JSX.Element | null => {
    if (!quotes || quotes.length === 0) return null;
    const last = quotes[quotes.length - 1];
    const rest = quotes.slice(0, -1);

    if (last && (last as any).__ellipsis) {
      return (
        <div
          key="ellipsis"
          className="w-full flex flex-row items-center justify-start text-gray-500 text-xs italic cursor-pointer hover:text-gray-300 transition"
          onClick={() => setShowAllQuotes(true)}
        >
          <span>…</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 ml-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </div>
      );
    }

    return (
      <div
        key={last.id}
        className="w-full flex flex-col justify-start items-start p-2 border-[3px] border-gray-600 rounded-sm text-gray-400 text-md box-border"
      >
        <span className="font-semibold text-gray-400 underline underline-offset-2 mb-1">
          <span className="font-semibold text-gray-200">{last?.createdBy?.pseudo}</span> a écrit :
        </span>

        <div className="flex flex-row gap-2 items-start w-full">
          <div className="w-[2px] bg-gray-500 rounded self-stretch" />
          <div className="flex flex-col flex-1 gap-2">
            {rest.length > 0 && <div className="flex flex-col gap-2">{renderNestedQuotes(rest)}</div>}
            <span className="text-xs text-gray-300">{(last?.text ?? "").replace(/<[^>]+>/g, "")}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[500px] w-full bg-gray-800 flex flex-col justify-center items-center ">
      <div className="w-full flex justify-end" onClick={handleCloseModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#9ca3af"
          className="size-10 mr-4 mt-2 hover:fill-gray-300 hover:cursor-pointer "
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h3 className="text-3xl mb-1 text-gray-200">EDIT COMMENT</h3>

      <fieldset className="flex flex-col justify-between items-center overflow-y-auto w-full max-w-3xl p-4">
        <legend className="text-lg text-center text-gray-300 font-medium mb-2">Modifiez le Commentaire</legend>

        <div className="flex flex-col w-full">
          <label className="text-base text-gray-400 mt-2 mb-1">
            Commentaire :
          </label>

          {(Array.isArray(comment?.quote) ? comment.quote.length : 0) > 0 && (
            <div className="mt-2 p-2 bg-gray-800 rounded-sm text-gray-300 text-xs font-normal overflow-x-auto overflow-y-hidden scrollable-quotes box-border">
              <div className="flex flex-col w-full space-y-2">{renderNestedQuotes(displayQuotes)}</div>

              {showAllQuotes && quotedThreads.length > 4 && (
                <button
                  className="flex flex-row justify-end items-center text-gray-400 text-xs mt-1 hover:text-gray-200 transition"
                  onClick={() => setShowAllQuotes(false)}
                >
                  Réduire les citations
                </button>
              )}
            </div>
          )}

          <TextEditor rQValue={rQValue} 
                      setRQValue={setRQValue} 
                      replyTo={replyTo} 
                      setReplyTo={setReplyTo}  
                      mode="editComment" />
        </div>

      </fieldset>

      <div className="flex flex-col justify-center items-center mt-4">
        {originalValue !== rQValue ? (
          <button
            className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
            onClick={handleEditComment}
          >
            Modifier
          </button>
        ) : (
          <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer opacity-50 cursor-not-allowed" disabled>
            Modifier
          </button>
        )}
      </div>
    </div>
  );
}
