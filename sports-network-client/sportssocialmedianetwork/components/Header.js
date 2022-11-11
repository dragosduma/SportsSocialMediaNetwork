import React from 'react'
import Image from 'next/image'
export default function Header() {
    return (
        <div>

            <div className='flex items-center justify-between max-w-6xl'>
                <div className='h-60 w-60 relative hidden lg:inline-grid'>
                    <Image src="/Sports social media network.png" layout='fill' className='object-contain' />
                </div>
            </div>
            <div className='h-40 w-40 relative lg:hidden'>
                <Image src="/Sports social media network small.png" layout='fill' className='object-contain' />
            </div>

        </div>
    )
}
