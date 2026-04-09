import { useState, useEffect } from 'react';

interface props {
    quotedThreads: any[]
}

function Quote({ quotedThreads }: props) {
    const [showAllQuotes, setShowAllQuotes] = useState(false);

    if (!quotedThreads || quotedThreads.length === 0) return null;

    // Troncature si > 4 citations
    let displayQuotes = quotedThreads;
    if (!showAllQuotes && quotedThreads.length > 4) {
        displayQuotes = [
            ...quotedThreads.slice(0, 2),
            "ellipsis",
            ...quotedThreads.slice(-2)
        ];
    }

    const renderNestedQuotes = (quotes: any[]): JSX.Element | null => {
        if (!quotes.length) return null;

        const last = quotes[quotes.length - 1];
        const rest = quotes.slice(0, -1);

        if (last === "ellipsis") {
            return (
                <div key="ellipsis"
                     className="w-full flex flex-row items-center justify-start text-gray-500 text-xs italic cursor-pointer hover:text-gray-300 transition"
                     onClick={() => setShowAllQuotes(true)}
                >
                    <span>…</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor"
                         className="size-4 ml-1"
                    >
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                    </svg>
                </div>
            );
        }

        return (
            <div key={last.id}
                 className="flex flex-col justify-start items-start p-2 border-[3px] border-gray-600 rounded-sm text-gray-400 text-md box-border w-full"
            >
                {/* Auteur */}
                <span className="font-semibold text-gray-400 underline underline-offset-2 mb-1">
                    <span className="font-semibold text-gray-200">{last.createdBy.pseudo}</span> a écrit :
                </span>

                {/* Conteneur quote + ligne verticale */}
                <div className="flex flex-row gap-2 items-start w-full">
                    {/* Ligne verticale */}
                    <div className="w-[2px] bg-gray-500 rounded self-stretch" />

                    {/* Texte + sous-quotes */}
                    <div className="flex flex-col flex-1 gap-2">
                        {rest.length > 0 && (
                            <div className="flex flex-col gap-2">
                                {renderNestedQuotes(rest)}
                            </div>
                        )}
                        <span className="text-xs text-gray-300">{last.text.replace(/<[^>]+>/g, "")}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mt-2 p-2 bg-gray-800 rounded-sm text-gray-300 text-xs font-normal overflow-x-auto overflow-y-hidden scrollable-quotes box-border flex flex-col space-y-2">
            {renderNestedQuotes(displayQuotes)}

            {/* Bouton Réduire */}
            {showAllQuotes && quotedThreads.length > 4 && (
                <button className="flex flex-row justify-end items-center text-gray-400 text-xs mt-1 hover:text-gray-200 transition cursor-pointer hover:underline"
                        onClick={() => setShowAllQuotes(false)}
                >
                    Réduire les citations
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor"
                         className="size-4 ml-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Quote;
