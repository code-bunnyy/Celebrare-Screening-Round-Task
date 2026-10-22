export default function AuthorSearchBox({
    className = '',
    value = '',
    onChange = () => {},
}) {
    return (
        <div className={`${className} w-full flex items-center justify-center my-3 px-4`}>
            <div className="flex gap-2 items-center
                            w-full max-w-140 p-2.5 border border-gray-500/40 rounded-lg bg-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    className="w-4.5 h-4.5 text-gray-400"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>

                <input 
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Search by author"
                    className="w-full bg-transparent outline-none text-[0.9rem] text-gray-700 placeholder-gray-400"
                />
            </div>
        </div>
    )
}
