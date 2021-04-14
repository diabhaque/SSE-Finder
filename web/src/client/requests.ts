import { Case } from "../types/caseTypes_trial";
import { getHostName } from "./utils";

export const getCases = (): Promise<Case[] | null> => {
    const url = new URL(`http://${getHostName()}/api/cases`);
    const request = new Request(url.toString());
    
    return fetch(request)
        .then((r) => r.json())
        .then((r) => r as Case[])
        .catch((err) => {
            console.log(err)
            return null
        });
};
