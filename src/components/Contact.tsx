function Contact() {
    return (
        <div className="h-full w-full flex flex-col justify-center bg-black text-white ">
            <div className="w-full flex flex-col justify-evenly items-center ">
                <h2 className="text-5xl mt-18">Contact</h2>

            </div>
            <div className="w-full flex flex-col justify-center items-center ">
                <div className="w-full flex justify-evenly items-center">
                
                    <input className="w-[25rem] my-2 p-2 border border-white rounded-lg" type="text" placeholder="Enter your name" />
                </div>
                <div className="w-full flex justify-evenly items-center">
                   
                    <input className="w-[25rem] my-2 p-2 border border-white rounded-lg" type="text" placeholder="enter your @mail" />
                </div>
                <div className="w-full flex justify-evenly items-center">
                  
                    <input className="w-[25rem] my-2 p-2 border border-white rounded-lg" type="text" placeholder="enter your subject" />
                </div>
                <div className="w-full flex justify-evenly items-center">
                    
                    <textarea className="w-[25rem] min-h-48 my-2 p-2 border border-white rounded-lg" placeholder="enter your message here" />
                </div>

            </div>

        </div>
    )
}

export default Contact