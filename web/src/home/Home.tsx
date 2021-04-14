import { useEffect, useState } from "react";
import { getCases } from "../client/requests";
import { Case } from "../types/caseTypes_trial";

export const Home = () => {
    const [cases, setCases] = useState<Case[]>([]);

    useEffect(() => {
        let isCancelled = false;

        getCases().then((r) => {
            if (!isCancelled && r) {
                setCases(r);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, []);

    return <ul>
        {cases.map(x => <li key={x.name}>{x.name} {x.hasCovid? 'has Covid' : 'does not have Covid'}</li>)}
    </ul>;
};
