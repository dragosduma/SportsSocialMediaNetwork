import { atom } from 'recoil'

export const updatePostModalState = atom({
    key: "updatePostModalState", // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});