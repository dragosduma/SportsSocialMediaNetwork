import React from 'react';
import Image from 'next/image';
import { SearchIcon } from '@heroicons/react/outline';

export default function Header() {
    return (


        <div className='flex items-center justify-between max-w-6xl'>
            <div className='h-60 w-60 relative hidden lg:inline-grid'>
                <Image
                    src="/Sports social media network.png"
                    layout='fill'
                    lassName='object-contain' />
            </div>
            <div className='h-40 w-40 relative lg:hidden'>
                <Image
                    src="/Sports social media network small.png"
                    layout='fill'
                    className='object-contain' />
            </div>

            <div className="relative mt-1">
                <div className="absolute top-2 left-2">
                    <SearchIcon className="h-5 text-gray-500" />
                </div>
                <input type="text" placeholder="Search" className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md" />
            </div>
        </div>



    )
}
