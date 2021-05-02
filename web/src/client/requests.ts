import { Case } from "../types/caseTypes_trial";
import { getHostName } from "./utils";

export const getCases = (): Promise<Case[] | null> => {
    const url = new URL(`https://${getHostName()}/api/cases`);
    const request = new Request(url.toString());
    
    return fetch(request)
        .then((r) => r.json())
        .then((r) => r as Case[])
        .catch((err) => {
            console.log(err)
            return null
        });
};

export const getCase = (caseID: String): Promise<Case | null> => {
    const url = new URL(`https://${getHostName()}/api/cases/${caseID}`);
    const request = new Request(url.toString());
    
    return fetch(request)
        .then((r) => r.json())
        .then((r) => r as Case)
        .catch((err) => {
            console.log(err)
            return null
        });
};

export const postCase = (postCase: Case): Promise<Case | null> => {
    const url = new URL(`https://${getHostName()}/api/cases/`);
    
    return fetch(url.toString(), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postCase),
    })
    .then((r) => r.json())
    .then((r) => r as Case)
    .catch((err) => {
        console.log(err.response)
        return null
    });
};
