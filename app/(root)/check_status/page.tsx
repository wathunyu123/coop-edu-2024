import Container from '@/components/container';
import React from 'react'
import Thai from '@/dictionary/thai';
import { LiaSearchPlusSolid } from "react-icons/lia";
import Menu from '@/components/menu';


export default function profile() {
    return (
        <Container>
            <div className='flex justify-start mt-16 mb-5'>
                <h1 className="">{Thai.MemberNo}</h1>
            </div>
            <div>
                <input type="text" className="w-full max-w-md p-2 rounded-xl border border-gray-300 bg-gray-300" />
            </div>
            <div className="flex justify-center -mt-10 -ml-60 ">
                <a>
                    <LiaSearchPlusSolid size={40} />
                </a>
            </div>
            <div> <Menu /></div>
        </Container>
    );
}