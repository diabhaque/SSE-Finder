import { Input, Table, message } from "antd";
import { useHistory } from "react-router-dom"
import { Case } from "../types/caseTypes_trial";
import React, { useState, useEffect } from "react";
import { getCases, getCase } from "../client/requests"
const { Search } = Input

export const CaseRecordsPage = () => {

    const history = useHistory();

    const [caseData, setCaseData] = useState<any>([{
        case_number: null,
        person_name: null,
        identify_document_number: null,
        date_of_birth: null,
        date_of_onset_of_symptoms: null,
        date_of_confirmation_of_infection_by_testing: null
    }]);

    useEffect(() => {
        getCases().then((cases: Case[] | null) => {
            setCaseData(cases)
        })
    }, []);

    const onSearch = (caseNumber: String) => {
        getCase(caseNumber).then((fetchedCase: Case | null) => {
            // Catch query errors (Since requests.ts return null if error, need to catch on .then)
            if (!fetchedCase) {
                message.error('Case number not found!');
                return;
            }
            history.push({
                pathname: `/case-data/${caseNumber}`,
                state: fetchedCase
              });
        })
    }

    const columns = [
        {
            title: "Case Number",
            dataIndex: "case_number",
            key: "case_number"
        },
        {
            title: "Person Name",
            dataIndex: "person_name",
            key: "person_name"
        },
        {
            title: "Identity Document Number",
            dataIndex: "identify_document_number",
            key: "identify_document_number"
        },
        {
            title: "Date Of Birth",
            dataIndex: "date_of_birth",
            key: "date_of_birth"
        },
        {
            title: "Date Of Onset",
            dataIndex: "date_of_onset_of_symptoms",
            key: "date_of_onset_of_symptoms"
        },
        {
            title: "Date Of Case Confirmed",
            dataIndex: "date_of_confirmation_of_infection_by_testing",
            key: "date_of_confirmation_of_infection_by_testing"
        }
    ];

    return (
        <div>
            <Search placeholder="Enter case number"  onSearch={onSearch} />
            <Table
                rowKey="case_number"
                columns={columns}
                dataSource={caseData}
            />
        </div>
    );
};
