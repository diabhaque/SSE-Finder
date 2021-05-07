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

export const getCase = (caseID: String): Promise<Case | null> => {
    const url = new URL(`http://${getHostName()}/api/cases/${caseID}`);
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
    const url = new URL(`http://${getHostName()}/api/cases/`);
    
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

export const getLocation = (locationString: string): Promise<Array<Object> | null> => {
    const url = new URL(`https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q=${encodeURI(locationString)}`);
    console.log(url.toString())
    return fetch(url.toString(), {
        method: "GET"
    })
    .then((r) => r.json())
    //From document: we can assume to use the first result as the location
    .then((r) => r[0] as Array<Object>)
    .catch((err) => {
        console.log(err.response)
        return null
    });
};

