import { atom } from 'recoil'

export const postModalState = atom({
    key: "postModalState", // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});