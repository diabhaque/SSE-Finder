import { useLocation } from "react-router-dom";
import { Descriptions, Table, Button } from "antd";
import { useState, useEffect } from "react";
import { Case } from "../types/caseTypes_trial";
import { AddEventDataModal } from "./AddEventDataModal";
import { getCase } from "../client/requests"

export const CaseData = (props: any) => {
    const location = useLocation();
    const caseID = location.pathname.split("/")[2];
    // should be loaded with useeffect and set to state.
    const [visible, setVisible] = useState(false);

    const [caseData, setCaseData] = useState<Case | null>({
        case_number: null,
        person_name: null,
        identify_document_number: null,
        date_of_birth: null,
        date_of_onset_of_symptoms: null,
        date_of_confirmation_of_infection_by_testing: null
    });

    useEffect(() => {
        if (location?.state) {
            setCaseData(location.state as Case)
        } else {
            getCase(caseID).then((fetchedCase: Case | null) => {
                setCaseData(fetchedCase)
            })
        }
    }, [caseID, location]);

    const onCreate = (values: any) => {
        console.log("Received values of form: ", values);
        const formData = {
            venueName: values.venueName,
            venueLocation: values.venueLocation,
            address: values.address,
            x: values.x,
            y: values.y,
            dateOfEvent: values.dateOfEvent.format("DD-MM-YYYY"),
            descriptions: values.descriptions
        };

        // do post request to add data to venue
        // add data to state

        setEventsData([...eventsData, formData]);
        setVisible(false);
    };

    const [eventsData, setEventsData] = useState<any>([]);

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
            title: "HK1980 X Coordinate",
            dataIndex: "x",
            key: "x"
        },
        {
            title: "HK1980 Y Coordinate",
            dataIndex: "y",
            key: "y"
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
                    {caseData?.case_number}
                </Descriptions.Item>
                <Descriptions.Item label="Person Name">
                    {caseData?.person_name}
                </Descriptions.Item>
                <Descriptions.Item label="ID Document Number">
                    {caseData?.identify_document_number}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                    {caseData?.date_of_birth}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Onset">
                    {caseData?.date_of_onset_of_symptoms}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Case Confirmed">
                    {caseData?.date_of_confirmation_of_infection_by_testing}
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
