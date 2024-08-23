import { create } from 'zustand';

interface Answer {
    question_num: number,
    answer: number,
    reason: string
}
interface AnswerStore {
    answer: {
        [key: number]: Answer
    }
    update: (answer: { [key: number]: Answer }) => void
}

const useAnswerStore = create<AnswerStore>((set) => ({
    answer: {
        1: {
            question_num: 1,
            answer: 2,
            reason: "일번입니다."
        },
        2: {
            question_num: 2,
            answer: 2,
            reason: "이번입니다."
        },
        3: {
            question_num: 3,
            answer: 2,
            reason: "삼번입니다."
        },
        4: {
            question_num: 4,
            answer: 2,
            reason: "사번입니다."
        },
        5: {
            question_num: 5,
            answer: 2,
            reason: "5번입니다."
        },
        6: {
            question_num: 6,
            answer: 2,
            reason: "6번입니다."
        },
        7: {
            question_num: 7,
            answer: 2,
            reason: "7번입니다."
        },
        8: {
            question_num: 8,
            answer: 2,
            reason: "8번입니다."
        },
        9: {
            question_num: 9,
            answer: 2,
            reason: "9번입니다."
        },

    },
    update: (answer: { [key: number]: Answer }) => {
        set(() => ({ answer }))
    },
}))

export { useAnswerStore, type Answer }