import Image from "next/image";
import test from '@/assets/old/KakaoTalk_bg.svg'
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>

      {/* <Image className="absolute top-0" src={test} alt="test" /> */}

      <div className="bg-[url('/assets/old/KakaoTalk_bg.svg')] h-[calc(100vh-70px)] flex justify-center items-center flex-col" >
        <div className="text-center h-[200px] w-[300px] drop-shadow-lg ">
          <h1 className="text-4xl">AI 도시를 부탁해</h1>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/setinfo">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              참여하기
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
