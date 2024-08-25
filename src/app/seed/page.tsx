"use client";
import { supaclient } from "@/libs/supa"
import { Grade, Region, User } from "@/stores/userStore"
import jsondata from './data.json';
export default function SeedPage() {
    const create_Data = async () => {
        const size = 204;
        const dummyArray = new Array(size).fill(0);
        let personIdx = 1000;
        for (const i of dummyArray) {
            personIdx++;
            // const ages = ["20대", "30대", "40대", "50대", "60대",]
            const ages = ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"]
            const grades = ["초등학생", "중학생", "고등학생", "일반"]
            const regions = [Region.강원, Region.경기, Region.경남, Region.경북, Region.광주, Region.대구, Region.대전, Region.부산, Region.서울, Region.세종, Region.울산, Region.인천, Region.전남, Region.전북, Region.제주, Region.충남, Region.충북]
            const user: User = {
                gender: Math.random() > 0.5 ? "남자" : "여자",
                age: ages[Math.floor(Math.random() * ages.length)],
                grade: Grade.초등학생,
                region: regions[Math.floor(Math.random() * regions.length)],
                schoolName: "",
            }

            let age_fixed = 0
            if (user.age === "1학년") age_fixed = 1
            else if (user.age === "2학년") age_fixed = 2
            else if (user.age === "3학년") age_fixed = 3
            else if (user.age === "4학년") age_fixed = 4
            else if (user.age === "5학년") age_fixed = 5
            else if (user.age === "6학년") age_fixed = 6
            else if (user.age === "20대") age_fixed = 21
            else if (user.age === "30대") age_fixed = 31
            else if (user.age === "40대") age_fixed = 41
            else if (user.age === "50대") age_fixed = 51
            else if (user.age === "60대") age_fixed = 61
            if (user.grade === "초등학생") age_fixed += 8
            else if (user.grade === "중학생") age_fixed += 13
            else if (user.grade === "고등학생") age_fixed += 16
            const { gender, grade, region, schoolName, age } = user;
            const tempAnswer = new Array(9).fill(0).map(() => Math.random() > .5 ? 1 : 2);
            const answer = tempAnswer;
            console.log(answer);
            const { error, data } = await supaclient.from("participants").insert({
                gender: gender === "남자" ? 1 : 2,
                grade: grade,
                region: region,
                schoolname: schoolName,
                age: age_fixed,
                age_raw: age,
                result_type: judge(answer)
            }).select("id");
            if (data) {
                const key = data[0].id;
                const query: any[] = []
                answer.map((v, idx) => {
                    const temp = jsondata as any;
                    const tempString = temp[idx.toString()]["data"][personIdx] ?? "";
                    console.log(idx, personIdx, tempString);
                    query.push({
                        question_id: idx + 1,
                        answer: v,
                        answer_text: tempString,
                        user_id: key
                    })
                })

                const result = await supaclient.from("answers").insert(query);
                if (result.error) {
                    // 에러 대응코드 필요하다.
                    alert("에러 발생");
                    return
                }
            }
        }
    }
    return <div>
        <h1>Seed Page</h1>
        <button className="btn btn-primary" onClick={create_Data}>Seed</button>
    </div>
}

//판별 논리식
function judge(object: number[]) {
    const result = []
    const score_result = [];
    let temp = 0; //임시변수
    //1~3번은 찬성이면 사회공공선(S)+1점  반대면 인간존엄성(H)  -1점
    for (let i = 0; i < 3; i++) {
        if (object[i] === 1) temp++;
        else temp--;
    }
    score_result.push(temp);
    if (temp > 0) result.push("S");
    else result.push("H");

    //4~6번은 찬성이면 기술합목적성(T)+1점  반대면 사회공공선(S)  -1점
    temp = 0;
    for (let i = 3; i < 6; i++) {
        if (object[i] === 1) temp++;
        else if (object[i] === 2) temp--;
    }
    score_result.push(temp);
    if (temp > 0) result.push("T");
    else result.push("S");

    //7~9번은 찬성이면 기술합목적성(T)+1점  반대면 인간존엄성(H)  -1점
    temp = 0;
    for (let i = 6; i < 9; i++) {
        if (object[i] === 1) temp++;
        else if (object[i] === 2) temp--;
    }
    score_result.push(temp);
    if (temp > 0) result.push("T");
    else result.push("H");

    console.log(result, score_result);
    const result_str = result.join("");
    return result_str;
}