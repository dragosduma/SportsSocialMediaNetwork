import Image from "next/legacy/image";
import { SearchIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { HomeIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

export default function Header() {
    const [open, setOpen] = useRecoilState(modalState);

    return (
        <div className="shadow-sm border-b sticky top-0 bg-white z-30">
            <div className='flex items-center justify-between max-w-6xl mx-4 xl:mx-auto'>
                <div className='h-24 w-24 relative hidden lg:inline-grid'>
                    <Image
                        src="/Sports social media network.png"
                        alt='Sports social media network'
                        layout='fill'
                        className='object-contain' />
                </div>
                <div className='h-14 w-14 relative lg:hidden'>
                    <Image
                        src="/Sports social media network small.png"
                        alt='Sports social media network small'
                        layout='fill'
                        className='object-contain' />
                </div>

                <div className="relative mt-1">
                    <div className="absolute top-2 left-2">
                        <SearchIcon className="h-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
                    />
                </div>

                <div className="flex space-x-4 items-center cursor-pointer">
                    <HomeIcon className='hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' />
                    <PlusCircleIcon onClick={() => setOpen(true)} className='h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' />
                    <img
                        src="/placeholder.jpg"
                        alt="user-image"
                        className='h-10 rounded full'
                    />
                </div>
            </div>
        </div>

    )
}
