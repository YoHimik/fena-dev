import {Translate, Language} from "../types";
import {useContext} from "react";
import {AppContext} from "../contexts";
import {EnUs} from "../translates/en-Us";

export const useTranslate = ():Translate => {
    const { language } = useContext(AppContext)

    switch (language) {
        case Language.EnUs:
        default:
            return EnUs
    }
}
