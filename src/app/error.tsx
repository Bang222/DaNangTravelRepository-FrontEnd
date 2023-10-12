'use client' // Error components must be Client Components

import { useEffect } from 'react'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function Error({error, reset,}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="bg-blue-400 min-h-screen flex items-center justify-center">
            <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-6xl text-blue-900 mb-4">500</h1>
                <LocalFireDepartmentIcon sx={{fontSize:"50px" ,color:"red"}}/>
                <p className="text-xl text-blue-900">Sorry, it's me, not you.</p>
                <p className="text-2xl text-blue-900">&#58;&#40;</p>
                <p className="mt-16">
                    <button onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()}
                        className="text-blue-500 border-b-2 border-dotted border-blue-500 font-italic hover:text-blue-900 hover:shadow-md"
                    >
                        Let me try again!
                    </button>
                </p>
            </div>
        </div>
    )
}
