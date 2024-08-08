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
            answer: -1,
            reason: ""
        },
    },
    update: (answer: { [key: number]: Answer }) => {
        set(() => ({ answer }))
    },
}))

export { useAnswerStore, type Answer }