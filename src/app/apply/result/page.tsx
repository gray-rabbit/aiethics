"use client";

import { Answer, useAnswerStore } from "@/stores/answerStore";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";

enum HUMAN_TYPE {
    인간중시 = "human",
    사회중시 = "social",
    기술중시 = "technical",
    균형중시 = "balance"
}
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
    const { result, score_result, result_type, human_type } = judge(answer);
    return <>
        <button className="btn" onClick={test}>음</button>
        <div className="grid grid-cols-12">
            <div className="col-span-4 flex flex-col justify-center items-center">
                <div className="card bg-base-200 shadow-xl">
                    <figure>
                        <Image src={`/assets/old/personality/${human_type}.svg`} width={200} height={0} alt={"human_type"} />
                    </figure>
                    <div className="card-body">
                        <div className="card-title">
                            <p>{result_type}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-8 flex flex-col justify-center items-cneter">
                {score_result.map((score, index) => {
                    console.log(score);
                    if (score > 0) {
                        return <div key={index} className="flex justify-center items-center">
                            <Image key={index} src={`/assets/old/scale/s${(index + 1).toString()}_agreeisgreater.svg`} width={550} height={300} alt={"balance" + index.toString()} />
                        </div>
                    }
                    else {
                        return <div key={index} className="flex justify-center items-center">
                            <Image key={index} src={`/assets/old/scale/s${(index + 1).toString()}_oppositeisgreater.svg`} width={550} height={300} alt={"balance" + index.toString()} />
                        </div>
                    }
                })}
            </div>
        </div>
    </>
}

//판별 논리식
function judge(object: { [key: number]: Answer }) {
    const result = []
    const score_result = [];
    let temp = 0; //임시변수
    //1~3번은 찬성이면 사회공공선(S)+1점  반대면 인간존엄성(H)  -1점
    for (let i = 1; i < 4; i++) {
        if (object[i].answer === 1) temp++;
        else temp--;
    }
    score_result.push(temp);
    if (temp > 0) result.push("S");
    else result.push("H");

    //4~6번은 찬성이면 기술합목적성(T)+1점  반대면 사회공공선(S)  -1점
    temp = 0;
    for (let i = 4; i < 7; i++) {
        if (object[i].answer === 1) temp++;
        else if (object[i].answer === 2) temp--;
    }
    score_result.push(temp);
    if (temp > 0) result.push("T");
    else result.push("S");

    //7~9번은 찬성이면 기술합목적성(T)+1점  반대면 인간존엄성(H)  -1점
    temp = 0;
    for (let i = 7; i < 10; i++) {
        if (object[i].answer === 1) temp++;
        else if (object[i].answer === 2) temp--;
    }
    score_result.push(temp);
    if (temp > 0) result.push("T");
    else result.push("H");

    console.log(result, score_result);
    const result_str = result.join("");
    let result_type = "";
    let human_type = "";
    switch (result_str) {
        case "HSH":
            result_type = "인간중시 S형";
            human_type = HUMAN_TYPE.인간중시;
            break;
        case "HTH":
            result_type = "인간중시 T형";
            human_type = HUMAN_TYPE.인간중시;

            break;
        case "SSH":
            result_type = "사회중시 H형";
            human_type = HUMAN_TYPE.사회중시;

            break;
        case "SST":
            result_type = "사회중시 T형";
            human_type = HUMAN_TYPE.사회중시;

            break;
        case "STT":
            result_type = "기술중시 S형";
            human_type = HUMAN_TYPE.기술중시;
            break;
        case "HTT":
            result_type = "기술중시 H형";
            human_type = HUMAN_TYPE.기술중시;
            break;
        case "HST":
            result_type = "균형중시 A형";
            human_type = HUMAN_TYPE.균형중시;
            break;
        case "STH":
            result_type = "균형중시 B형";
            human_type = HUMAN_TYPE.균형중시;
            break;
        default:
            result_type = "타입을 찾을 수 없습니다.";
            break;
    }
    return { result, score_result, human_type, result_type };

}