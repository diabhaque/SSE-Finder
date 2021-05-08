import { useLocation, useHistory } from "react-router-dom";
import { Descriptions, Table, message, Tag } from "antd";
import { useState, useEffect } from "react";
import { getEvent } from "../client/requests";
import moment from "moment";

export const EventData = (props: any) => {
    const history = useHistory();
    const location = useLocation();
    const eventID = location.pathname.split("/")[2];

    const [eventData, setEventData] = useState<any>({
        id: null,
        date_of_the_event: null,
        venue_name: null,
        venue_location: null,
        address_of_the_venue_location: null,
        hk1980_grid_coordinates_of_the_venue_location: null,
        description_of_the_event: null,
        cases: []
    });

    useEffect(() => {
        getEvent(eventID).then((fetchedEvent: any) => {
            if (!fetchedEvent) {
                message.error("Cannot find the event!");
                return;
            }
            setEventData(fetchedEvent);
            console.log(fetchedEvent);
        });
    }, [eventID, location]);
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
        },
        {
            title: "Associations",
            key: "associations",
            render: (text: any, record: any) => (
                <>
                    {moment(eventData.date_of_the_event).isBetween(
                        moment(record.date_of_onset_of_symptoms).subtract(
                            3,
                            "days"
                        ),
                        record.date_of_confirmation_of_infection_by_testing,
                        "day",
                        "[]"
                    ) ? (
                        <Tag color="volcano">Possible Infector</Tag>
                    ) : (
                        <></>
                    )}
                    {moment(record?.date_of_onset_of_symptoms).isBetween(
                        moment(eventData.date_of_the_event).add(
                            2,
                            "days"
                        ),
                        moment(eventData.date_of_the_event).add(
                            14,
                            "days"
                        ),
                        "day",
                        "[]"
                    ) ? (
                        <Tag color="lime">Possibly Infected</Tag>
                    ) : (
                        <></>
                    )}
                </>
            )
        }
    ];

    return (
        <>
            <br />
            <Descriptions
                title="Event Details"
                layout="horizontal"
                size="small"
                bordered
            >
                <Descriptions.Item label="Event ID">
                    {eventData?.id}
                </Descriptions.Item>
                <Descriptions.Item label="Date of the Event">
                    {eventData?.date_of_the_event}
                </Descriptions.Item>
                <Descriptions.Item label="Venue Name">
                    {eventData?.venue_name}
                </Descriptions.Item>
                <Descriptions.Item label="Venue Location">
                    {eventData?.venue_location}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                    {eventData?.address_of_the_venue_location}
                </Descriptions.Item>
                <Descriptions.Item label="HK1980 Coordinates">
                    {eventData?.hk1980_grid_coordinates_of_the_venue_location}
                </Descriptions.Item>
                <Descriptions.Item label="Is Potential SSE?">
                    {eventData?.cases.length >= 6 ? "Yes" : "No"}
                </Descriptions.Item>
                <Descriptions.Item label="Descriptions">
                    {eventData?.description_of_the_event}
                </Descriptions.Item>
            </Descriptions>
            <br />
            <div className="ant-descriptions-header">
                <div className="ant-descriptions-title">Cases associated</div>
            </div>
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            history.push(`/case-data/${record.case_number}`);
                        }
                    };
                }}
                dataSource={eventData?.cases}
                columns={columns}
                rowKey={"case_number"}
            />
        </>
    );
};
