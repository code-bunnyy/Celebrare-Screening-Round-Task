
import HeartIcon from "../components/HeartIcon";

export default function PhotosDisplaySection(
    {
        toBeDisplayedPhotos = [],
        fevorites = [],
        dispatch = null,
    }
) {

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-4 my-4">
                {toBeDisplayedPhotos.map((photo, index) => (
                    <div
                        key={`displayed-photo-${index}-${photo.url}`}
                        className="shadow-[0_10px_40px_rgba(0,0,0,0.10),0_20px_60px_rgba(0,0,0,0.08)]
                                rounded-xl"
                    >
                        <div
                            className='w-full aspect-16/11 rounded-t-xl overflow-hidden'
                        >
                            <img
                                src={photo.download_url}
                                alt={`Photo by ${photo.author}`}
                                className='object-cover min-w-full min-h-full'
                            />
                        </div>

                        <div className="flex items-center justify-between bg-white p-4 rounded-b-xl">
                            <div className="text-sm text-[#111827] font-semibold">
                                {photo.author}
                            </div>

                            <button
                                type="button"
                                onClick={
                                    () => dispatch({ type: "TOGGLE_FAVOURITE", photoId: photo.id })
                                }
                                aria-label={`Toggle favourite for ${photo.author}`}
                                className="cursor-pointer"
                            >
                                <HeartIcon
                                    iconSizeClass="w-5 h-5"
                                    filled={fevorites.includes(photo.id)}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-sm text-gray-500 text-center p-6 mb-4">
                {
                    toBeDisplayedPhotos.length === 0
                        ? "No photos found."
                        : `Total ${toBeDisplayedPhotos.length} photos displayed.`
                }
            </div>
        </div>
    )
}
