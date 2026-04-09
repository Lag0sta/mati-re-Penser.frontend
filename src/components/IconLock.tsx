import { useAppSelector } from "../store/hooks.js"
import { useState,  } from 'react';

import {modalProps} from "../types/Props.js";
interface props {
    modalProps: modalProps
    setAuthType: (value: string) => any
    iconOrigin : string
}

function IconLock({ modalProps, setAuthType, iconOrigin }: props) {
    const [lockHover, setLockHover] = useState<boolean>(false);

    const isLocked = useAppSelector((state) => state.topic.value.isLocked);

    const handleLockTopic = async () => {
        setAuthType("lockTopic");
        modalProps.setIsModalOpen(true)
        modalProps.setModalComponent('auth');
    }

    const handleUnlockTopic = () => {
        setAuthType("lockTopic");
        modalProps.setIsModalOpen(true)
        modalProps.setModalComponent('auth');
    }

    return (

        <div>
            {isLocked &&
                <div className="relative group inline-block">

                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 m-1 cursor-pointer"
                        style={{ color: lockHover ? '#D1D5DB' : " #9CA3AF" }} onMouseEnter={() => setLockHover(true)}
                        onMouseLeave={() => setLockHover(false)}
                        onClick={handleUnlockTopic}>
                        <path fillRule="evenodd"
                            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                            clipRule="evenodd" />
                    </svg>
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                        dégeler la discussion
                    </span>
                </div>
            }

            {/* Icône geler le Topic */}
            {!isLocked &&
                <div className="relative group inline-block">

                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 m-1 cursor-pointer"
                        style={{ color: lockHover ? '#D1D5DB' : " #9CA3AF" }} onMouseEnter={() => setLockHover(true)}
                        onMouseLeave={() => setLockHover(false)}
                        onClick={handleLockTopic}>
                        <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
                    </svg>
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                        geler la discussion
                    </span>
                </div>
            }
        </div>
    )
}

export default IconLock