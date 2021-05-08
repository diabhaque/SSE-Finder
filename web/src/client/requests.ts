import { Case } from "../types/caseTypes_trial";
import { getHostName } from "./utils";

export const getCases = (): Promise<Case[] | null> => {
    const url = new URL(`http://${getHostName()}/api/cases`);
    const request = new Request(url.toString());

    let ok = false;
    return fetch(request)
        .then((r) => {
            ok = r.ok;
            return r.json();
        })
        .then((r) => {
            if (ok) {
                return r as Case[];
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
};

export const getEvents = (): Promise<any[] | null> => {
    const url = new URL(`http://${getHostName()}/api/events`);
    const request = new Request(url.toString());

    let ok = false;
    return fetch(request)
        .then((r) => {
            ok = r.ok;
            return r.json();
        })
        .then((r) => {
            if (ok) {
                return r as any[];
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
};

export const getEvent = (eventID: string): Promise<any | null> => {
    const url = new URL(`http://${getHostName()}/api/events/${eventID}`);
    const request = new Request(url.toString());

    let ok = false;
    return fetch(request)
        .then((r) => {
            ok = r.ok;
            return r.json();
        })
        .then((r) => {
            if (ok) {
                return r as any;
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
};

export const getCase = (caseID: String): Promise<Case | null> => {
    const url = new URL(`http://${getHostName()}/api/cases/${caseID}`);
    const request = new Request(url.toString());

    let ok = false;
    return fetch(request)
        .then((r) => {
            ok = r.ok;
            return r.json();
        })
        .then((r) => {
            if (ok) {
                return r as Case;
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
};

export const postCase = (postCase: Case): Promise<Case | null> => {
    const url = new URL(`http://${getHostName()}/api/cases/`);

    let ok = false;
    return fetch(url.toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postCase)
    })
        .then((r) => {
            ok = r.ok;
            return r.json();
        })
        .then((r) => {
            if (ok) {
                return r as Case;
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
};

export const getLocation = (
    locationString: string
): Promise<Array<Object> | null> => {
    const url = new URL(
        `https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q=${encodeURI(
            locationString
        )}`
    );

    let ok = false;
    return (
        fetch(url.toString(), {
            method: "GET"
        })
            .then((r) => {
                ok = r.ok;
                return r.json();
            })
            //From document: we can assume to use the first result as the location
            .then((r) => {
                if (ok) {
                    return r[0] as Array<Object>;
                } else {
                    return null;
                }
            })
            .catch((err) => {
                console.log(err);
                return null;
            })
    );
};

export const postEvent = (postEvent: any): Promise<any | null> => {
    const url = new URL(`http://${getHostName()}/api/events/`);

    let ok = false;
    return fetch(url.toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postEvent)
    })
        .then((r) => {
            ok = r.ok;
            return r.json();
        })
        .then((r) => {
            if (ok) {
                return r as any;
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
};

export const patchEventToCase = (
    case_id: any,
    patch: any
): Promise<any | null> => {
    const url = new URL(`http://${getHostName()}/api/cases/${case_id}/`);

    let ok = false;
    return fetch(url.toString(), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patch)
    })
        .then((r) => {
            ok = r.ok;
            return r.json();
        })
        .then((r) => {
            if (ok) {
                return r as any;
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
};
