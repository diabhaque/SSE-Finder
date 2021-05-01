import { Table } from "antd";
import React, { useState } from "react";

export const CaseRecordsPage = () => {

    const [caseData, setCaseData] = useState<any>([{
        caseNumber: 53,
        personName: "Chan, Tai Man",
        idNumber: "A123456(1)",
        dateOfBirth: "13 Nov 1982",
        dateOfOnset: "15 Apr 2021",
        dateOfCaseConfirmed: "17 Apr 2021"
    }]);

    const columns = [
        {
            title: "Case Number",
            dataIndex: "caseNumber",
            key: "caseNumber"
        },
        {
            title: "Person Name",
            dataIndex: "personName",
            key: "personName"
        },
        {
            title: "Identity Document Number",
            dataIndex: "idNumber",
            key: "idNumber"
        },
        {
            title: "Date Of Birth",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth"
        },
        {
            title: "Date Of Onset",
            dataIndex: "dateOfOnset",
            key: "dateOfOnset"
        },
        {
            title: "Date Of Case Confirmed",
            dataIndex: "dateOfCaseConfirmed",
            key: "dateOfCaseConfirmed"
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={caseData}
        />
    );
};
