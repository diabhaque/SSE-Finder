import { useLocation } from "react-router-dom";
import { Descriptions, Table, Button } from "antd";
import { useState } from "react";
import { AddEventDataModal } from "./AddEventDataModal";

export const CaseData = (props: any) => {
    const location = useLocation();
    const caseID = location.pathname.split("/")[2];
    // should be loaded with useeffect and set to state.
    const [visible, setVisible] = useState(false);

    const onCreate = (values: any) => {
        console.log("Received values of form: ", values);
        const formData = {
            venueName: values.venueName,
            venueLocation: values.venueLocation,
            address: values.address,
            dateOfEvent: values.dateOfEvent.format("DD-MM-YYYY"),
            descriptions: values.descriptions
        };

        // do post request to add data to venue
        // add data to state

        setEventsData([...eventsData, formData]);
        setVisible(false);
    };

    const [eventsData, setEventsData] = useState<any>([]);

    // Should be queried using the case id
    const hardCode = {
        caseNumber: 53,
        personName: "Chan, Tai Man",
        idNumber: "A123456(1)",
        dateOfBirth: "13 Nov 1982",
        dateOfOnset: "15 Apr 2021",
        dateOfCaseConfirmed: "17 Apr 2021"
    };

    const columns = [
        {
            title: "Venue Name",
            dataIndex: "venueName",
            key: "venueName"
        },
        {
            title: "Venue Location",
            dataIndex: "venueLocation",
            key: "venueLocation"
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address"
        },
        {
            title: "Date of Event",
            dataIndex: "dateOfEvent",
            key: "dateOfEvent"
        },
        {
            title: "Descriptions",
            dataIndex: "descriptions",
            key: "descriptions"
        }
    ];

    const handleAdd = () => {
        setVisible(true);
    };

    return (
        <>
            <AddEventDataModal
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
            <br/>
            <Descriptions
                title="Case Details"
                layout="horizontal"
                size="small"
                bordered
            >
                <Descriptions.Item label="Case Number">
                    {hardCode.caseNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Person Name">
                    {hardCode.personName}
                </Descriptions.Item>
                <Descriptions.Item label="ID Document Number">
                    {hardCode.idNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                    {hardCode.dateOfBirth}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Onset">
                    {hardCode.dateOfOnset}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Case Confirmed">
                    {hardCode.dateOfCaseConfirmed}
                </Descriptions.Item>
            </Descriptions>
            <br/>
            <div className="ant-descriptions-header">
                <div className="ant-descriptions-title">
                    Social Events attended
                </div>
                <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16
                    }}
                >
                    Add Event
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={eventsData}
                scroll={{ y: "45vh" }}
                pagination={false}
            />
        </>
    );
};
