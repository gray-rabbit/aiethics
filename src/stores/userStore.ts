import { create } from 'zustand';

enum Grade {
    초등학생 = "초등학생",
    중학생 = "중학생",
    고등학생 = "고등학생",
    일반 = "일반(대학생)"
}
enum Region {
    서울 = "서울",
    경기 = "경기",
    인천 = "인천",
    대전 = "대전",
    대구 = "대구",
    광주 = "광주",
    부산 = "부산",
    울산 = "울산",
    세종 = "세종",
    강원 = "강원",
    충북 = "충북",
    충남 = "충남",
    전북 = "전북",
    전남 = "전남",
    경북 = "경북",
    경남 = "경남",
    제주 = "제주",
}

interface User {
    gender: "남자" | "여자",
    grade: Grade,
    region: Region,
    schoolName: string,
    age: string,
}
interface UserStore {
    user: User,
    update: (user: User) => void;
}
const useUserStore = create<UserStore>(set => {
    return {
        user: {
            gender: "남자",
            grade: Grade.초등학생,
            region: Region.서울,
            schoolName: "",
            age: "1학년"
        }, update: (user: User) => {
            set(() => ({ user }))
        }
    }
})

export { useUserStore, Grade, Region, type User } 