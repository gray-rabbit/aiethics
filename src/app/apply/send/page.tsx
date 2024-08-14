"use client";
import { supaclient } from "@/libs/supa";
import { useAnswerStore } from "@/stores/answerStore";
import { useUserStore } from "@/stores/userStore"

export default function SendPage() {
    const { user } = useUserStore();
    const { answer } = useAnswerStore();

    console.log(user);
    console.log(answer);

    const click_handler = async () => {
        let age = 0
        if (user.age === "1학년") age = 1
        else if (user.age === "2학년") age = 2
        else if (user.age === "3학년") age = 3
        else if (user.age === "4학년") age = 4
        else if (user.age === "5학년") age = 5
        else if (user.age === "6학년") age = 6
        else if (user.age === "20대") age = 21
        else if (user.age === "30대") age = 31
        else if (user.age === "40대") age = 41
        else if (user.age === "50대") age = 51
        else if (user.age === "60대") age = 61

        if (user.grade === "초등학생") age += 8
        else if (user.grade === "중학생") age += 13
        else if (user.grade === "고등학생") age += 16

        const { count, data, error, status, statusText } = await supaclient.from("participant").insert({
            gender: user.gender === "남자" ? 1 : 2,
            grade: user.grade,
            region: user.region,
            schoolname: user.schoolName,
            age: age,
        })
        console.log(count, data, error, status, statusText)
    }
    return (<div>
        <h1>Send Page</h1>
        <button className="btn btn-primary" onClick={click_handler}>Send</button>
    </div>)
}