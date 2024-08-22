"use client";

import { Answer, useAnswerStore } from "@/stores/answerStore";
import { useUserStore } from "@/stores/userStore";

export default function ResultPage() {
    const { user, update } = useUserStore();
    const { answer } = useAnswerStore();
    const new_user = user;
    const test = () => {
        update({
            ...user,
            age: "20대",
        })
    }
    const result = judge(answer);
    return <>
        <button className="btn" onClick={test}>음</button>
        <p>음 리절트임 아무튼 리젍트임</p>
        <p>{JSON.stringify(answer)}</p>
        <p>{JSON.stringify(result)}</p>
    </>
}

//판별 논리식
function judge(object: { [key: number]: Answer }) {
    const result = []
    let temp = 0; //임시변수
    //1~3번은 찬성이면 사회공공선(S)+1점  반대면 인간존엄성(H)  -1점
    for (let i = 1; i < 4; i++) {
        if (object[i].answer === 1) temp++;
        else temp--;
    }
    if (temp > 0) result.push("S");
    else result.push("H");

    //4~6번은 찬성이면 기술합목적성(T)+1점  반대면 사회공공선(S)  -1점
    temp = 0;
    for (let i = 4; i < 7; i++) {
        if (object[i].answer === 1) temp++;
        else if (object[i].answer === 2) temp--;
    }
    if (temp > 0) result.push("T");
    else result.push("S");

    //7~9번은 찬성이면 기술합목적성(T)+1점  반대면 인간존엄성(H)  -1점
    temp = 0;
    for (let i = 7; i < 10; i++) {
        if (object[i].answer === 1) temp++;
        else if (object[i].answer === 2) temp--;
    }
    if (temp > 0) result.push("T");
    else result.push("H");

    console.log(result);
    return result;

}