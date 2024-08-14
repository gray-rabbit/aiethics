import Image from "next/image";
import test from '@/assets/old/KakaoTalk_bg.svg'
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>

      <div className="text-center">
        <h1 className="text-4xl">AI 도시를 부탁해</h1>
      </div>
      {/* <Image className="absolute top-0" src={test} alt="test" /> */}

      <div >
        <Link href="/setinfo">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            참여하기
          </button>
        </Link>
        <Link href="/stage1">stage1</Link>
        <Link href="/stage2">stage2</Link>
      </div>
    </>
  );
}
