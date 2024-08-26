"use client";
import { supaclient } from "@/libs/supa";
import { Question } from "@/stores/answerStore";
import { get } from "http";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";

const COLORS = [
  "#4269d0",
  "#efb118",
  "#ff725c",
  "#6cc5b0",
  "#3ca951",
  "#ff8ab7",
  "#a463f2",
  "#97bbf5",
  "#9c6b4e",
  "#9498a0",
];

export default function ShowResultPage() {
  const [current_data, set_current_data] = useState<any>({});
  const [gender, setGender] = useState(0);
  const [grade, setGrade] = useState("");
  const [age, setAge] = useState(0);
  const [datas, setDatas] = useState<{ [key: string]: any }>({});
  const [page, setPage] = useState(3);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    supaclient
      .from("questions")
      .select("*")
      .then(({ data, error }) => {
        if (!data) return;
        setQuestions(data);
        console.log(data);
      });
    //  const data = JSON.parse(`[{"id":1,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":1,"question_text":"AI 스피커를 통해 가정의 일상 대화를 수집하여 위기 상황시 출동하는 사회 안전망을 만들려고 합니다. 정확도를 높이기 위해서는 모든 가정에서 AI 스피커를 설치해야합니다.","positive_text":"노약자나 장애인, 어린이 등 사회 위약층 등에게 안전에 도움이 되어 사회 공공에 이익이 됩니다.","negative_text":"개인의 사생활이 노출될 수 있습니다."},{"id":2,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":2,"question_text":"안면인식 CCTV를 도입하여 전과자 일상생활을 감시하고자 합니다.","positive_text":"전과자들의 범죄 발생률이 줄어들어 사회 안전에 도움이 됩니다.","negative_text":"전과자는 이미 죄에 대한 처벌을 받았습니다. 범죄자의 인권도 존중되어야 합니다."},{"id":3,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":3,"question_text":"경찰 로봇을 도입하여 순찰을 시키고 사건이 발생했을 때 진압하도록 합니다.","positive_text":"순찰하는 경찰 수가 증가하면 사건 사고가 줄어들어 사회가 안전해질 것입니다.","negative_text":"경찰 로봇이 사건을 진압할 때 경찰 로봇에 의해 사람이 다칠 수있습니다."},{"id":4,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":4,"question_text":"딥페이크 기술을 이용해 갑작스럽게 가족을 잃은 사람의 우울증 치료를 돕는 앱을 만들려고 합니다. 이 앱은 생전 사진과 녹음 된 목소리를 이용해 죽은 가족의 영상을 만들어낼 수 있습니다.","positive_text":"앱을 통해 생성된 영상으로 그리움을 달래 우울증 치료에도움이 됩니다.","negative_text":"앱을 통해 손쉽게 불법 동영상을 만들어 사회에 사기 범죄가늘어나게 될 것입니다."},{"id":5,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":5,"question_text":"노인 일자리를 위해 도시 환경 미화 업무를 맡겼으나 신속성이 떨어지고 청결에 대한 민원이 발생해 청소 로봇을 도입하고자 합니다.","positive_text":"적은 비용으로 도시를 깨끗하게 관리할 수 있습니다.","negative_text":"노인 일자리가 사라지면 사회 취약 계층인 노인들의 생계에 어려움이 생길 수 있습니다."},{"id":6,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":6,"question_text":"드론 배달과 택배 업무를 도입하고자 합니다.","positive_text":"빠르고 적은 비용으로 배달과 택배가 가능해집니다.","negative_text":"택배와 배달 업무에 종사하고 있는 많은 사람들이 일자리를 잃어 사회문제가 될 것입니다."},{"id":7,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":7,"question_text":"전쟁을 대비하여 인공지능 살상 무기를 개발하려고 합니다.","positive_text":"전쟁에서 이기고 우리를 지키기 위해서 인공지능 무기를 개발해야 합니다.","negative_text":"어떠한 경우에도 인공지능 기기가 사람을 해치게 해서는 안됩니다."},{"id":8,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":8,"question_text":"설명문을 입력하면 몇 초 만에 이미지를 생성해주는 인공지능 프로그램으로 제작한 그림이 미술전에 출품 되었습니다. 이 작품이 출품 된 작품 중가장 아름다워 우승작으로 선정하려고 합니다.","positive_text":"가장 아름다운 작품이라며 인공지능이 생성한 것도 예술 작품으로 보고 시상 해야 합니다.","negative_text":"인간의 창의성이 담기지 않은 창작물은 작품으로 볼 수 없습니다."},{"id":9,"created_at":"2024-08-08T08:20:32.143838+00:00","question_num":9,"question_text":"부모와 똑같은 목소리와 모습을 한 돌봄 로봇을 개발하려고 합니다.","positive_text":"아이들에게 정서적인 안정감까지 줄 수 있어 돌봄의 목적에 충실합니다.","negative_text":"정서적인 교감은 인간 고유의 것으로 로봇에게 인간 고유영역을 대신하게 해서는 안됩니다."}]`)

    supaclient
      .from("all_view")
      .select("*")
      .then(({ data, error }) => {
        if (!data) return;
        const datas: any = {};
        ages.map((v) => {
          if (datas[v]) {
          } else {
            datas[v] = JSON.parse(base_string);
          }
        });
        datas["초등학생"] = JSON.parse(base_string);
        datas["중학생"] = JSON.parse(base_string);
        datas["고등학생"] = JSON.parse(base_string);
        datas["일반(대학생)"] = JSON.parse(base_string);
        datas["총괄"] = JSON.parse(base_string);
        data.map((v: any) => {
          const gender = v.gender == 1 ? "male" : "female";
          datas[v.grade].questions[v.gender][v.question_id - 1][
            v.answer == 1 ? "agree" : "disagree"
          ] += v.count; //질문에 따라 증가
          datas[v.grade].questions[0][v.question_id - 1][
            v.answer == 1 ? "agree" : "disagree"
          ] += v.count; //질문에 따라 증가
          datas[v.age].questions[v.gender][v.question_id - 1][
            v.answer == 1 ? "agree" : "disagree"
          ] += v.count; //질문에 따라 증가
          datas[v.age].questions[0][v.question_id - 1][
            v.answer == 1 ? "agree" : "disagree"
          ] += v.count; //질문에 따라 증가

          datas["총괄"].questions[0][v.question_id - 1][
            v.answer == 1 ? "agree" : "disagree"
          ] += v.count; //질문에 따라 증가
          datas["총괄"].questions[v.gender][v.question_id - 1][
            v.answer == 1 ? "agree" : "disagree"
          ] += v.count; //질문에 따라 증가
          if (v.question_id == 1) {
            datas[v.grade][gender] += v.count; //성별에 따라 증가
            datas[v.grade]["total"] += v.count; //총괄에 증가

            datas[v.age][gender] += v.count; //성별에 따라 증가
            datas[v.age]["total"] += v.count; //총괄에 증가

            datas["총괄"][gender] += v.count;
            datas["총괄"]["total"] += v.count;
          }
        });

        supaclient
          .from("all_types")
          .select("*")
          .then(({ data, error }) => {
            if (!data) return;
            data.map((v: any) => {
              const typestr = v.result_type;
              if (!datas[v.age].types[0][typestr]) {
                datas[v.age].types[0][typestr] = 0;
                datas[v.age].types[1][typestr] = 0;
                datas[v.age].types[2][typestr] = 0;
              }
              if (!datas[v.grade].types[0][typestr]) {
                datas[v.grade].types[0][typestr] = 0;
                datas[v.grade].types[1][typestr] = 0;
                datas[v.grade].types[2][typestr] = 0;
              }
              if (!datas["총괄"].types[0][typestr]) {
                datas["총괄"].types[0][typestr] = 0;
                datas["총괄"].types[1][typestr] = 0;
                datas["총괄"].types[2][typestr] = 0;
              }

              datas[v.age].types[0][typestr] += v.count;
              datas[v.grade].types[0][typestr] += v.count;
              datas["총괄"].types[0][typestr] += v.count;

              datas[v.age].types[v.gender][typestr] += v.count;
              datas[v.grade].types[v.gender][typestr] += v.count;
              datas["총괄"].types[v.gender][typestr] += v.count;
            });
            datas["총괄"]["grade"] = "전체";
            // set_current_data(datas["총괄"]);
            const current: any = [];
            // console.log(datas['총괄'].types[0])

            // set_current_data(datas["총괄"]);
            setDatas(datas);
            setGrade("총괄");
            setPage(3);
            console.log(datas);
          });
      });
  }, []);

  useEffect(() => {
    if (
      grade == "총괄" ||
      grade == "초등학생" ||
      grade == "중학생" ||
      grade == "고등학생" ||
      grade == "일반(대학생)"
    ) {
      const st = JSON.stringify(datas[grade]);
      set_current_data(JSON.parse(st));
      console.log(datas[grade]);
    }
  }, [grade, age]);
  const select_gender_handle = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = event.target as HTMLSelectElement;
    setGender(parseInt(target.value));
  };
  const select_grade_handle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (parseInt(event.target.value) == 0) {
      setGrade("총괄");
    } else {
      setGrade(event.target.value);
    }
    setAge(0);
  };
  const select_age_handle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    if (value == 0) {
      setAge(0);
      set_current_data(datas[grade]);
      return;
    } else {
      setAge(value);
      set_current_data(datas[value]);
    }
  };
  return (
    <div>
      <div className="flex w-full">
        <button
          className={
            " flex-1 flex flex-col items-center transition-all duration-700 " +
            (page == 1 ? "bg-blue-200 text-blue-600" : "bg-gray-300  ")
          }
          onClick={() => setPage(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 48 48"
            stroke="currentColor"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill="#455A64"
                d="M36,4H26c0,1.1-0.9,2-2,2s-2-0.9-2-2H12C9.8,4,8,5.8,8,8v32c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V8 C40,5.8,38.2,4,36,4z"
              />{" "}
              <path
                fill="#ffffff"
                d="M36,41H12c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h24c0.6,0,1,0.4,1,1v32C37,40.6,36.6,41,36,41z"
              />{" "}
              <g fill="#90A4AE">
                {" "}
                <path d="M26,4c0,1.1-0.9,2-2,2s-2-0.9-2-2h-7v4c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V4H26z" />{" "}
                <path d="M24,0c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S26.2,0,24,0z M24,6c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S25.1,6,24,6z" />{" "}
              </g>{" "}
              <g fill="#CFD8DC">
                {" "}
                <rect x="21" y="20" width="12" height="2" />{" "}
                <rect x="15" y="19" width="4" height="4" />{" "}
              </g>{" "}
              <g fill="#03A9F4">
                {" "}
                <rect x="21" y="29" width="12" height="2" />{" "}
                <rect x="15" y="28" width="4" height="4" />{" "}
              </g>{" "}
            </g>
          </svg>
          <span className="btm-nav-label">가치 통계</span>
        </button>
        <button
          className={
            "  flex-1 flex flex-col items-center transition-all duration-700 " +
            (page == 2 ? "bg-teal-200 text-teal-600" : "bg-gray-300 ")
          }
          onClick={() => setPage(2)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="btm-nav-label">기술(문항) 통계</span>
        </button>
        <button
          className={
            "  flex-1 flex flex-col items-center transition-all duration-700 " +
            (page == 3 ? "bg-yellow-200 text-orange-400" : "bg-gray-300 ")
          }
          onClick={() => setPage(3)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Zm2-9H13V10a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V13h1a1,1,0,0,0,0-2Z"
            />
          </svg>
          <span className="btm-nav-label">의견 보기</span>
        </button>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="form-control ">
          <label className="label">
            <span className="label-text">성별</span>
          </label>
          <select
            className="select select-primary"
            defaultValue={0}
            onChange={select_gender_handle}
          >
            <option value="0">전체</option>
            <option value="1">남자</option>
            <option value="2">여자</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">학교급</span>
          </label>
          <select
            className="select select-primary"
            defaultValue={0}
            onChange={select_grade_handle}
          >
            <option value="0">전체</option>
            <option value="초등학생">초등학교</option>
            <option value="중학생">중학교</option>
            <option value="고등학생">고등학교</option>
            <option value="일반(대학생)">일반(대학생)</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">학년(나이별)</span>
          </label>
          <select
            className="select select-primary"
            value={age}
            onChange={select_age_handle}
          >
            {grade == "초등학생" && (
              <>
                <option value="0" selected>
                  전체
                </option>
                <option value="8">1학년</option>
                <option value="9">2학년</option>
                <option value="10">3학년</option>
                <option value="11">4학년</option>
                <option value="12">5학년</option>
                <option value="13">6학년</option>
              </>
            )}
            {grade == "중학생" && (
              <>
                <option value="0" selected>
                  전체
                </option>
                <option value="14">1학년</option>
                <option value="15">2학년</option>
                <option value="16">3학년</option>
              </>
            )}
            {grade == "고등학생" && (
              <>
                <option value="0" selected>
                  전체
                </option>
                <option value="17">1학년</option>
                <option value="18">2학년</option>
                <option value="19">3학년</option>
              </>
            )}
            {grade == "일반(대학생)" && (
              <>
                <option value="0" selected>
                  전체
                </option>
                <option value="21">20대</option>
                <option value="31">30대</option>
                <option value="41">40대</option>
                <option value="51">50대</option>
                <option value="61">60대</option>
              </>
            )}
            {grade == "총괄" && <option value="0">전체</option>}
          </select>
        </div>
      </div>
      {page == 1 && Object.keys(current_data).includes("questions") && (
        <div className="flex justify-center">
          {get_chart(current_data.types[gender])}
        </div>
      )}
      {page == 2 &&
        questions.length > 0 &&
        Object.keys(current_data).includes("questions") && (
          <div>
            {questions.map((v: any, idx: number) => {
              console.log(current_data.questions);
              // return null;
              const agree_rate = Math.floor(
                (current_data.questions[gender][idx].agree /
                  (current_data.questions[gender][idx].agree +
                    current_data.questions[gender][idx].disagree)) *
                  100
              );
              const disagree_rate = 100 - agree_rate;
              console.log(agree_rate, disagree_rate);
              const agree_className = `bg-blue-400 h-[20px] tooltip tooltip-open transition-all duration-700`;
              const disagree_className = `bg-red-400 h-[20px] tooltip tooltip-open transition-all duration-700`;
              return (
                <div
                  key={idx}
                  className="bg-base-100 drop-shadow-2xl  rounded-2xl m-2 mb-3"
                >
                  <div className="pt-3">
                    <span className="badge badge-primary badge-outline">
                      문항
                    </span>
                    <span>{v.question_text}</span>
                  </div>
                  <div className="grid grid-cols-12  p-2 mt-[25px]">
                    <div className="col-span-1 flex justify-center items-center">
                      찬성
                    </div>
                    <div className="col-span-10 flex justify-center items-center">
                      <div
                        className={agree_className}
                        data-tip={agree_rate}
                        style={{ width: `${agree_rate}%` }}
                      />
                      <div
                        className={disagree_className}
                        data-tip={disagree_rate}
                        style={{ width: `${disagree_rate}%` }}
                      />
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      반대
                    </div>

                    <div className="col-span-6 p-2 my-2 bg-blue-100 rounded-lg">
                      {questions[idx].positive_text}
                    </div>
                    <div className="col-span-6 p-2 my-2 bg-red-100 rounded-lg">
                      {questions[idx].negative_text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      {OpinionDisplayer(questions, page, gender, grade, age)}
    </div>
  );
}

function OpinionDisplayer(
  questions: Question[],
  current_page: number,
  gender: number,
  grade: string,
  age: number
) {
  const [idx, setIdx] = useState(0);
  const [opinion, setOpinion] = useState<string[]>([]);
  const [current_paging, setCurrentPaging] = useState(0);
  const page_size = 50;

  useEffect(() => {
    if (current_page !== 3) return;
    const query_filter: { [key: string]: any } = {};
    query_filter["question_id"] = idx + 1;
    if (age != 0) {
      query_filter["age"] = age;
    }
    if (grade != "총괄") {
      query_filter["grade"] = grade;
    }
    console.log("돌앗음");
    supaclient
      .from("all_opinions")
      .select("question_id, answer_text")
      .match(query_filter)
      .range(current_paging * page_size, (current_paging + 1) * page_size - 1)
      .then(({ data, error }) => {
        if (!data) return;
        const temp: string[] = [];
        data.map((v: any) => {
          temp.push(v.answer_text);
        });
        setOpinion((prev) => [...prev, ...temp]);
      });
  }, [current_page, age, grade, idx, current_paging]);
  if (current_page !== 3) return null;

  function next_question() {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    }
  }
  function get_opinion() {
    supaclient
      .from("all_opinions")
      .select("answer_text")
      .eq("question_num", idx + 1)
      .then(({ data, error }) => {
        if (!data) return;
        console.log(data);
      });
  }
  return (
    <>
      <p>{}</p>

      {opinion.map((v, idx) => {
        return <p key={idx}>{v}</p>;
      })}
      <button
        onClick={() => setCurrentPaging(current_paging + 1)}
        className="btn btn-primary"
      >
        다음50
      </button>
    </>
  );
}

const ages = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 31, 41, 51, 61];
const base_temp = {
  male: 0,
  female: 0,
  grade: "",
  total: 0,
  types: [{}, {}, {}],
  questions: [
    new Array(9).fill({ agree: 0, disagree: 0 }),
    new Array(9).fill({ agree: 0, disagree: 0 }),
    new Array(9).fill({ agree: 0, disagree: 0 }),
  ],
};
const base_string = JSON.stringify(base_temp);

function get_chart(data: any) {
  const current_data: any = [];
  Object.keys(data).map((v) => {
    current_data.push({
      name: v,
      value: data[v],
    });
  });
  return (
    <PieChart width={800} height={600}>
      <Legend layout="vertical" verticalAlign="middle" align="left" />
      <Pie
        data={current_data}
        dataKey={"value"}
        cx="50%"
        cy="50%"
        outerRadius={200}
        label
      >
        {current_data.map((_: any, index: number) => {
          return (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          );
        })}
      </Pie>
    </PieChart>
  );
}
