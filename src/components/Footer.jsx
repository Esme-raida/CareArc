import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline"
export default function Footer() {
    return (
        <footer className="flex flex-row gap-8 justify-between px-3 py-2 border-t border-t-gray-200">
            <div className="flex flex-row py-2.5 gap-2 items-center">
                <Link to="/">
                    <HeartIcon className="w-8.5 h-8.5 md:w-10 md:h-10 lg:w-10 lg:h-10 px-2.5 bg-blue-500 text-white rounded-md hover:scale-105 hover:cursor-pointer hover:bg-blue-700" />
                </Link>
                <h1 className="flex flex-row text-lg md:text-2xl font-bold">
                    CareArc
                </h1>
            </div>
            <div className="text-gray-500 text-xs mt-5">
                © 2026 CareArc. All Rights Reserved
            </div>
        </footer>
    )
}