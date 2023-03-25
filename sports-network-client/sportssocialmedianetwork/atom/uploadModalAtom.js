import { atom } from 'recoil'

export const uploadModalState = atom({
    key: "uploadModalState", // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});