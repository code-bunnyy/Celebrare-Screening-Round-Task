import {
    useState, useReducer, useEffect, useCallback, useMemo
} from 'react'
import AuthorSearchBox from './AuthorSearchBox'


import useFetchPhotos from '../hooks/useFetchPhotos';
import PhotosDisplaySection from './PhotosDisplaySection';

export default function Gallery() {
    const url = "https://picsum.photos/v2/list?limit=30";
    const { photos, loading, error } = useFetchPhotos(url);
    const [searchQuery, setSearchQuery] = useState('');
    

    function favouritesReducer(state, action) {
        switch (action.type) {
            case "TOGGLE_FAVOURITE":
                return state.includes(action.photoId)
                    ? state.filter((id) => id !== action.photoId)
                    : [...state, action.photoId];
            default:
                return state;
        }
    }

    const [favourites, dispatch] = useReducer(
        favouritesReducer,
        [],
        () => {
            const savedFavourites = localStorage.getItem('favourites')
            return savedFavourites ? JSON.parse(savedFavourites) : []
        }
    );

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites])


    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const filteredPhotos = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return photos.filter(photo =>
            photo.author.toLowerCase().includes(query)
        );
    }, [photos, searchQuery]);


    return (
        <div
            className=' flex flex-col
                        w-full max-w-400 '
        >
            <div className='flex items-center bg-white  p-3'>
                <div className='text-[#111827] font-semibold'>
                    Photo Gallery
                </div>
            </div>

            {loading && (
                <div className='flex justify-center p-10'>
                    <div className='w-10 h-10 border-3 border-gray-300 border-t-[#2363eb] rounded-full animate-spin' />
                </div>
            )}

            {error && (
                <div className='bg-red-50 border border-red-300 text-red-700 rounded-md p-4 m-3'>
                    <p className='font-semibold'>Failed to load photos</p>
                    <p className='text-sm mt-1'>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div>
                    <AuthorSearchBox
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    <PhotosDisplaySection
                        toBeDisplayedPhotos={filteredPhotos}
                        fevorites={favourites}
                        dispatch={dispatch}
                    />
                </div>
            )}
        </div>
    )
}
