"use client";
import { useAnswerStore } from "@/stores/answerStore";
import { Grade, Region, useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { FormEvent, MouseEventHandler, useState } from "react";

export default function SetInfoPage() {
    const { user, update } = useUserStore();
    const [start, setStart] = useState(false);
    const { answer, update: answer_update } = useAnswerStore();
    const router = useRouter();
    const click_handler = () => {
        // TODO: 데이터 확인과정 필요함

        // 모든 데이터를 초기화 한다. 
        answer_update({
            1: {
                question_num: 1,
                answer: -1,
                reason: ""
            },
            2: {
                question_num: 2,
                answer: -1,
                reason: ""
            },
            3: {
                question_num: 3,
                answer: -1,
                reason: ""
            },
            4: {
                question_num: 4,
                answer: -1,
                reason: ""
            },
            5: {
                question_num: 5,
                answer: -1,
                reason: ""
            },
            6: {
                question_num: 6,
                answer: -1,
                reason: ""
            },
            7: {
                question_num: 7,
                answer: -1,
                reason: ""
            },
            8: {
                question_num: 8,
                answer: -1,
                reason: ""
            },
            9: {
                question_num: 9,
                answer: -1,
                reason: ""
            },
        })
        setStart(true);
    }

    if (start) {
        let bool = true;
        Object.keys(answer).forEach((key) => {
            if (answer[Number(key)].answer !== -1) bool = false;
        })
        if (bool) {
            router.push("/apply");
            return null;
        }
    }
    return <div className="flex justify-center h-screen items-center ">
        {/* 남자여자 */}
        <div className="w-[800px] bg-white p-5 text-black drop-shadow-2xl rounded-2xl">
            <p>정보를 입력하세요</p>
            <div className="">
                <p>성별을 선택하세요.</p>
                <div className="flex gap-3 ">
                    <button className={"btn " + (user.gender === "남자" ? "btn-primary" : " btn-outline")} onClick={() => update({ ...user, gender: "남자" })}>남자</button>
                    <button className={"btn " + (user.gender === "여자" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, gender: "여자" })}>여자</button>
                </div>
            </div>
            <div className="mt-5" >
                <p>지역을 선택하세요.</p>
                <div className="w-full  flex-wrap flex gap-3 ">
                    <button className={"btn " + (user.region === "서울" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.서울 })}>서울</button>
                    <button className={"btn " + (user.region === "경기" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.경기 })}>경기</button>
                    <button className={"btn " + (user.region === "인천" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.인천 })}>인천</button>
                    <button className={"btn " + (user.region === "대전" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.대전 })}>대전</button>
                    <button className={"btn " + (user.region === "대구" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.대구 })}>대구</button>
                    <button className={"btn " + (user.region === "광주" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.광주 })}>광주</button>
                    <button className={"btn " + (user.region === "부산" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.부산 })}>부산</button>
                    <button className={"btn " + (user.region === "울산" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.울산 })}>울산</button>
                    <button className={"btn " + (user.region === "세종" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.세종 })}>세종</button>
                    <button className={"btn " + (user.region === "충북" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.충북 })}>충북</button>
                    <button className={"btn " + (user.region === "충남" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.충남 })}>충남</button>
                    <button className={"btn " + (user.region === "강원" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.강원 })}>강원</button>
                    <button className={"btn " + (user.region === "전북" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.전북 })}>전북</button>
                    <button className={"btn " + (user.region === "전남" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.전남 })}>전남</button>
                    <button className={"btn " + (user.region === "경북" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.경북 })}>경북</button>
                    <button className={"btn " + (user.region === "경남" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.경남 })}>경남</button>
                    <button className={"btn " + (user.region === "제주" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, region: Region.제주 })}>제주</button>
                </div>
            </div>

            <div className="mt-5" >
                <p>학년을 선택하세요.</p>
                <div className="flex gap-3 ">
                    <button className={"btn " + (user.grade === "초등학생" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "1학년", grade: Grade.초등학생 })}>초등학생</button>
                    <button className={"btn " + (user.grade === "중학생" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "1학년", grade: Grade.중학생 })}>중학생</button>
                    <button className={"btn " + (user.grade === "고등학생" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "1학년", grade: Grade.고등학생 })}>고등학생</button>
                    <button className={"btn " + (user.grade === "일반(대학생)" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, grade: Grade.일반, age: "20대" })}>일반(대학생)</button>
                </div>
            </div>

            <div className="mt-5" >
                {user.grade === Grade.일반 && (
                    <>
                        <p>연령을 입력해주세요.</p>
                        <div className="flex gap-3">
                            <button className={"btn " + (user.age === "20대" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "20대" })}>20대</button>
                            <button className={"btn " + (user.age === "30대" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "30대" })}>30대</button>
                            <button className={"btn " + (user.age === "40대" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "40대" })}>40대</button>
                            <button className={"btn " + (user.age === "50대" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "50대" })}>50대</button>
                            <button className={"btn " + (user.age === "60대 이상" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "60대 이상" })}>60대 이상</button>
                        </div>
                    </>
                )}
                {user.grade !== Grade.일반 && (
                    <>
                        <p>학년을 선택해주세요.</p>
                        <div className="flex gap-3">
                            <button className={"btn " + (user.age === "1학년" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "1학년" })}>1학년</button>
                            <button className={"btn " + (user.age === "2학년" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "2학년" })}>2학년</button>
                            <button className={"btn " + (user.age === "3학년" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "3학년" })}>3학년</button>
                            {user.grade === Grade.초등학생 && <>
                                <button className={"btn " + (user.age === "4학년" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "4학년" })}>4학년</button>
                                <button className={"btn " + (user.age === "5학년" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "5학년" })}>5학년</button>
                                <button className={"btn " + (user.age === "6학년" ? "btn-primary" : "btn-outline")} onClick={() => update({ ...user, age: "6학년" })}>6학년</button>
                            </>}
                        </div>
                    </>
                )}
            </div>
            <div className="divider"></div>
            <div className="mt-10 text-center">
                <button className="btn btn-wide btn-info" onClick={click_handler}>다음</button>
            </div>
        </div>
    </div>
}