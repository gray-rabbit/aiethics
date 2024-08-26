"use client";

import Image from "next/image";
import {
  ChangeEvent,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { supaclient } from "@/libs/supa";
import { useUserStore } from "@/stores/userStore";
import { Answer, Question, useAnswerStore } from "@/stores/answerStore";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const [count, setCount] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { user } = useUserStore();
  const { answer, update } = useAnswerStore();
  const router = useRouter();

  function handleNext() {
    setCount(count + 1);
  }

  function handleSetCurrent(num: number) {
    setCount(num);
  }

  function answerUpdate(newAnswer: Answer) {
    const nAnswer = { ...answer };
    const num = newAnswer.question_num;
    nAnswer[num] = newAnswer;

    //모든 문항이 완료되었는지 확인하는 코드
    let idx = -1;
    for (const k in nAnswer) {
      if (nAnswer[k].answer === -1) {
        idx = Number(k);
        break;
      }
    }
    if (idx === -1) {
      //이 상황은 완료된 상황이다.
      console.log("완료");
      // TODO: 서버로 전송하는 코드를 넣는다.
      update(nAnswer);
      console.log(answer);
      return;
    }
    if (questions.length > count) {
      let newCount = count;
      console.log(newCount, count, nAnswer[newCount].answer);
      while (nAnswer[newCount] && nAnswer[newCount].answer !== -1) {
        newCount++;
      }
      if (questions.length >= newCount) {
        setCount(newCount);
      } else {
        setCount(idx);
      }
    } else {
      setCount(idx);
    }
    update(nAnswer);
  }

  const getQuestions = useCallback(async () => {
    try {
      const { data } = await supaclient.from("questions").select("*");
      // const data = JSON.parse(`[{"id":1,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":1,"question_text":"AI 스피커를 통해 가정의 일상 대화를 수집하여 위기 상황시 출동하는 사회 안전망을 만들려고 합니다. 정확도를 높이기 위해서는 모든 가정에서 AI 스피커를 설치해야합니다.","positive_text":"노약자나 장애인, 어린이 등 사회 위약층 등에게 안전에 도움이 되어 사회 공공에 이익이 됩니다.","negative_text":"개인의 사생활이 노출될 수 있습니다."},{"id":2,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":2,"question_text":"안면인식 CCTV를 도입하여 전과자 일상생활을 감시하고자 합니다.","positive_text":"전과자들의 범죄 발생률이 줄어들어 사회 안전에 도움이 됩니다.","negative_text":"전과자는 이미 죄에 대한 처벌을 받았습니다. 범죄자의 인권도 존중되어야 합니다."},{"id":3,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":3,"question_text":"경찰 로봇을 도입하여 순찰을 시키고 사건이 발생했을 때 진압하도록 합니다.","positive_text":"순찰하는 경찰 수가 증가하면 사건 사고가 줄어들어 사회가 안전해질 것입니다.","negative_text":"경찰 로봇이 사건을 진압할 때 경찰 로봇에 의해 사람이 다칠 수있습니다."},{"id":4,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":4,"question_text":"딥페이크 기술을 이용해 갑작스럽게 가족을 잃은 사람의 우울증 치료를 돕는 앱을 만들려고 합니다. 이 앱은 생전 사진과 녹음 된 목소리를 이용해 죽은 가족의 영상을 만들어낼 수 있습니다.","positive_text":"앱을 통해 생성된 영상으로 그리움을 달래 우울증 치료에도움이 됩니다.","negative_text":"앱을 통해 손쉽게 불법 동영상을 만들어 사회에 사기 범죄가늘어나게 될 것입니다."},{"id":5,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":5,"question_text":"노인 일자리를 위해 도시 환경 미화 업무를 맡겼으나 신속성이 떨어지고 청결에 대한 민원이 발생해 청소 로봇을 도입하고자 합니다.","positive_text":"적은 비용으로 도시를 깨끗하게 관리할 수 있습니다.","negative_text":"노인 일자리가 사라지면 사회 취약 계층인 노인들의 생계에 어려움이 생길 수 있습니다."},{"id":6,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":6,"question_text":"드론 배달과 택배 업무를 도입하고자 합니다.","positive_text":"빠르고 적은 비용으로 배달과 택배가 가능해집니다.","negative_text":"택배와 배달 업무에 종사하고 있는 많은 사람들이 일자리를 잃어 사회문제가 될 것입니다."},{"id":7,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":7,"question_text":"전쟁을 대비하여 인공지능 살상 무기를 개발하려고 합니다.","positive_text":"전쟁에서 이기고 우리를 지키기 위해서 인공지능 무기를 개발해야 합니다.","negative_text":"어떠한 경우에도 인공지능 기기가 사람을 해치게 해서는 안됩니다."},{"id":8,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":8,"question_text":"설명문을 입력하면 몇 초 만에 이미지를 생성해주는 인공지능 프로그램으로 제작한 그림이 미술전에 출품 되었습니다. 이 작품이 출품 된 작품 중가장 아름다워 우승작으로 선정하려고 합니다.","positive_text":"가장 아름다운 작품이라며 인공지능이 생성한 것도 예술 작품으로 보고 시상 해야 합니다.","negative_text":"인간의 창의성이 담기지 않은 창작물은 작품으로 볼 수 없습니다."},{"id":9,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":9,"question_text":"부모와 똑같은 목소리와 모습을 한 돌봄 로봇을 개발하려고 합니다.","positive_text":"아이들에게 정서적인 안정감까지 줄 수 있어 돌봄의 목적에 충실합니다.","negative_text":"정서적인 교감은 인간 고유의 것으로 로봇에게 인간 고유영역을 대신하게 해서는 안됩니다."}]`)
      if (data) {
        setQuestions(data);
        const answerData = {} as {
          [key: number]: {
            question_num: number;
            answer: number;
            reason: string;
          };
        };
        //초기화 코드 나중에 다시 되살려야함
        data.map((k: Question) => {
          answerData[k.question_num] = {
            question_num: k.question_num,
            //여기를 되살려야함
            answer: -1,
            // answer: Math.floor(Math.random() * 2) + 1,
            reason: "",
          };
        });
        update(answerData);
        console.log(answerData);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [update]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  useEffect(() => {
    console.log(answer);
    let flag = false;
    for (const k in answer) {
      if (answer[k].answer === -1) {
        flag = true;
        return;
        break;
      }
    }
    if (!flag) {
      console.log("이건 완료니까 다음 페이지로");
      const send_db = async () => {
        const { age, gender, grade, region, schoolName } = user;
        let age_fixed = 0;
        if (user.age === "1학년") age_fixed = 1;
        else if (user.age === "2학년") age_fixed = 2;
        else if (user.age === "3학년") age_fixed = 3;
        else if (user.age === "4학년") age_fixed = 4;
        else if (user.age === "5학년") age_fixed = 5;
        else if (user.age === "6학년") age_fixed = 6;
        else if (user.age === "20대") age_fixed = 21;
        else if (user.age === "30대") age_fixed = 31;
        else if (user.age === "40대") age_fixed = 41;
        else if (user.age === "50대") age_fixed = 51;
        else if (user.age === "60대") age_fixed = 61;
        if (user.grade === "초등학생") age_fixed += 7;
        else if (user.grade === "중학생") age_fixed += 13;
        else if (user.grade === "고등학생") age_fixed += 16;

        const { error, data } = await supaclient
          .from("participants")
          .insert({
            gender: gender === "남자" ? 1 : 2,
            grade: grade,
            region: region,
            schoolname: schoolName,
            age: age_fixed,
            age_raw: age,
            result_type: judge(answer),
          })
          .select("id");
        if (error) {
          // TODO: 에러 대응코드 필요하다.
          return;
        }
        const query: any[] = [];
        const key = data[0].id;
        Object.keys(answer).map((k) => {
          const idx = Number(k);
          const temp = {
            question_id: Number(answer[idx].question_num),
            answer: Number(answer[idx].answer),
            answer_text: answer[idx].reason,
            user_id: Number(key),
          };
          query.push(temp);
        });
        const result = await supaclient.from("answers").insert(query);
        if (result.error) {
          // 에러 대응코드 필요하다.
          return;
        }
        router.push("/apply/result");
      };
      send_db();
    }
  }, [user, answer, router]);

  return (
    <div className="h-[calc(100vh-70px)] bg-slate-200">
      <div className="w-full bg-yellow-600 p-5">
        <p className="text-xl">
          문제의 상황 설명과 선택지의 근거를 바탕으로 선택해주세요. 총{" "}
          {Object.keys(answer).length}문항입니다.
        </p>
      </div>
      <StateDisplayer
        current={count}
        answers={answer}
        setCurrent={handleSetCurrent}
      ></StateDisplayer>
      {questions.length > 0 && (
        <QuestionDisplayer
          question={questions[count - 1]}
          answer={answer[count]}
          answerUpdate={answerUpdate}
        ></QuestionDisplayer>
      )}
    </div>
  );
}
function QuestionDisplayer({
  question,
  answer,
  answerUpdate,
}: {
  question: Question;
  answer: Answer;
  answerUpdate: (newAnswer: Answer) => void;
}) {
  const [clicked, setClicked] = useState(answer.answer);
  const [optionText, setOptionText] = useState(answer.reason);
  const optionInput = useRef<HTMLInputElement>(null);

  const { question_num, question_text, positive_text, negative_text } =
    question;
  useEffect(() => {
    setClicked(answer.answer);
    setOptionText(answer.reason);
  }, [answer]);

  function change_hanler(e: ChangeEvent<HTMLInputElement>) {
    setOptionText(e.target.value);
  }

  function clickHandler(answer: number) {
    setClicked(answer);
  }

  function submitHandler() {
    const newAnswer = { ...answer, answer: clicked, reason: optionText };
    setClicked(-1);
    setOptionText("");
    answerUpdate(newAnswer);
  }

  const q = question_text
    .replace(".", ".\r\n")
    .split("\r\n")
    .map((k, i) => <p key={i}>{k}</p>);

  return (
    <>
      <div className="text-center text-2xl m-5 bg-slate-200 p-2 drop-shadow-lg">
        {question_text}
      </div>
      <div className="flex gap-20 justify-center">
        <div
          className={
            "w-[400px] bg-slate-100 rounded-xl drop-shadow-xl" +
            (clicked === 1 ? " border-4 border-red-400" : "")
          }
          onClick={() => clickHandler(1)}
        >
          <Image
            src={`./assets/old/question_images/q${question_num}/agree.svg`}
            width={400}
            height={400}
            alt="이거 뭐냐"
          ></Image>
          <p className="text-center bg-green-600 py-2 font-bold  text-lg">
            찬성
          </p>
          <p className=" text-black p-3">{positive_text}</p>
        </div>
        <div
          className={
            "w-[400px] bg-slate-100 rounded-2xl drop-shadow-xl" +
            (clicked === 2 ? " border-4 border-red-400" : "")
          }
          onClick={() => clickHandler(2)}
        >
          <Image
            src={`./assets/old/question_images/q${question_num}/disagree.svg`}
            width={400}
            height={400}
            alt="이거 뭐냐"
          ></Image>
          <p className="text-center bg-blue-500 py-2 font-bold  text-lg">
            반대
          </p>
          <p className=" text-black p-3">{negative_text}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-2  gap-4">
        <div className="flex justify-center">
          <div>
            <label htmlFor="option" className="label">
              의견을 남겨주세요.(생략가능)
            </label>
            <input
              id="option"
              ref={optionInput}
              className="w-[800px] input input-bordered border-gray-400 drop-shadow-xl bg-gray-100 text-black "
              placeholder="위 문항에 대한 시장님의 의견을 들려주세요!"
              onChange={change_hanler}
              value={optionText}
            ></input>
          </div>
        </div>
        <button
          className="btn btn-warning mx-[30px]"
          disabled={clicked === -1}
          onClick={submitHandler}
        >
          제출
        </button>
      </div>
    </>
  );
}
function StateDisplayer({
  answers,
  current,
  setCurrent,
}: {
  answers: { [key: number]: Answer };
  current: number;
  setCurrent: (num: number) => void;
}) {
  const data = Object.keys(answers).map((k) => Number(k));
  return (
    <div className="flex w-full justify-center gap-5 my-5 ">
      {data.map((k, i) => {
        const idx = i + 1; //인덱스를 1 증가시키기 위한 코드
        if (current === idx) {
          return (
            <div
              key={idx}
              onClick={() => setCurrent(idx)}
              className={` w-5 h-5 border-4 bg-blue-600 border-yellow-300   rounded-full`}
            ></div>
          );
        } else {
          if (answers[k].answer === -1) {
            return (
              <div
                key={idx}
                onClick={() => setCurrent(idx)}
                className={` w-5 h-5 border-4 bg-gray-700 border-gray-700 rounded-full`}
              ></div>
            );
          } else {
            return (
              <div
                key={idx}
                onClick={() => setCurrent(idx)}
                className={` w-5 h-5 border-4 bg-green-700 border-green-700 rounded-full`}
              ></div>
            );
          }
        }
      })}
    </div>
  );
}

//판별 논리식
function judge(object: { [key: number]: Answer }) {
  const result = [];
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
  return result_str;
}
