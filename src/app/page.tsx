import Image from "next/image";
import test from '@/assets/old/KakaoTalk_bg.svg'
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>

      {/* <Image className="absolute top-0" src={test} alt="test" /> */}

      <div className="bg-[url('/assets/old/KakaoTalk_bg.svg')] h-[calc(100vh-70px)] flex justify-center items-center flex-col" >
        <div className="text-center h-[200px] w-[360px] drop-shadow-lg ">
          <h1 className="text-4xl">AI 도시를 부탁해</h1>
          <br/>
          <div className="text text-sm center ">
            <p> 당신은 <span className="font-bold">AI 도시 시장님</span> 입니다.</p>
            <p> AI와 관련된 다양한 상황에서 <span className="font-bold">당신의 입장을 선택</span>해주세요.</p>
          </div>
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
