import { useLocation, useHistory } from "react-router-dom";
import { Descriptions, Table, Button, Space, message, Tag } from "antd";
import { useState, useEffect } from "react";
import { Case } from "../types/caseTypes_trial";
import { AddEventDataModal } from "./AddEventDataModal";
import { AddExistingEventDataModal } from "./AddExistingEventDataModal";
import {
    getCase,
    getEvents,
    patchEventToCase,
    postEvent
} from "../client/requests";
import moment from "moment";

// Create an add existing event data modal which queries and gets old events, then allows user to pick and submit from one of them.

export const CaseData = (props: any) => {
    const history = useHistory();
    const location = useLocation();
    const caseID = location.pathname.split("/")[2];
    // should be loaded with useeffect and set to state.
    const [visible, setVisible] = useState(false);
    const [existingVisible, setExistingVisible] = useState(false);
    const [eventsData, setEventsData] = useState<any | null>([]);
    const [allEventsData, setAllEventsData] = useState<any | null>([]);
    const [buttonDisable, setButtonDisable] = useState(true);

    const [caseData, setCaseData] = useState<Case | null>({
        case_number: null,
        person_name: null,
        identify_document_number: null,
        date_of_birth: null,
        date_of_onset_of_symptoms: null,
        date_of_confirmation_of_infection_by_testing: null,
        events: []
    });

    useEffect(() => {
        getCase(caseID).then((fetchedCase: Case | null) => {
            if (!fetchedCase) {
                message.error("Cannot find the case!");
                return;
            }
            setCaseData(fetchedCase);
            console.log(fetchedCase?.events);
            setButtonDisable(false);
            getEvents().then((fetchedEvents: any | null) => {
                if (!fetchedEvents) {
                    message.error("Cannot find the events of the case!");
                    return;
                }
                setAllEventsData(
                    fetchedEvents.filter((fetchedEvent: any) => {
                        return (
                            moment(fetchedEvent.date_of_the_event) >=
                                moment(
                                    fetchedCase?.date_of_onset_of_symptoms
                                ).subtract(14, "days") &&
                            moment(fetchedEvent.date_of_the_event) <
                                moment(
                                    fetchedCase?.date_of_confirmation_of_infection_by_testing
                                ).endOf("day")
                        );
                    })
                );
                setEventsData(
                    fetchedEvents.filter((fetchedEvent: any) => {
                        return fetchedCase?.events.includes(fetchedEvent.id);
                    })
                );
            });
        });
    }, [caseID, location]);

    const onCreate = (values: any) => {
        console.log("Received values of form: ", values);
        const formData = {
            venue_name: values.venueName,
            venue_location: values.venueLocation,
            address_of_the_venue_location: values.address,
            hk1980_grid_coordinates_of_the_venue_location: `(${values.x}, ${values.y})`,
            date_of_the_event: values.dateOfEvent.format("YYYY-MM-DD"),
            description_of_the_event: values.descriptions
        };

        postEvent(formData).then((newEvent: any | null) => {
            if (!newEvent) {
                message.error("Cannot post the event!");
                setVisible(false);
                return;
            }
            console.log(newEvent);
            // setLoading(false);
            const newEventID = newEvent.id;
            if (newEventID) {
                patchEventToCase(caseData?.case_number, {
                    events: [...caseData?.events, newEventID]
                }).then((patchedCase: any | null) => {
                    if (!patchedCase) {
                        message.error("Cannot patch event to the case!");
                        setVisible(false);
                        return;
                    }
                    console.log(newEvent);
                    setEventsData([...eventsData, newEvent]);
                });
            }
        });
        setVisible(false);
    };

    const columns = [
        {
            title: "Venue Name",
            dataIndex: "venue_name",
            key: "venue_name"
        },
        {
            title: "Venue Location",
            dataIndex: "venue_location",
            key: "venue_location"
        },
        {
            title: "Address",
            dataIndex: "address_of_the_venue_location",
            key: "address_of_the_venue_location"
        },
        {
            title: "HK1980 Coordinate",
            dataIndex: "hk1980_grid_coordinates_of_the_venue_location",
            key: "hk1980_grid_coordinates_of_the_venue_location"
        },
        {
            title: "Date of Event",
            dataIndex: "date_of_the_event",
            key: "date_of_the_event"
        },
        {
            title: "Associations",
            key: "associations",
            render: (text: any, record: any) => (
                <>
                    {moment(record.date_of_the_event).isBetween(
                        moment(caseData?.date_of_onset_of_symptoms).subtract(
                            3,
                            "days"
                        ),
                        caseData?.date_of_confirmation_of_infection_by_testing,
                        "day",
                        "[]"
                    ) ? (
                        <Tag color="volcano">Possible Infector</Tag>
                    ) : (
                        <></>
                    )}
                    {moment(caseData?.date_of_onset_of_symptoms).isBetween(
                        moment(record.date_of_the_event).add(
                            2,
                            "days"
                        ),
                        moment(record.date_of_the_event).add(
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

    const handleAdd = () => {
        setVisible(true);
    };

    const handleExistingAdd = () => {
        setExistingVisible(true);
    };

    const onExistingCreate = (values: any) => {
        // performPatchRequest
        // filter from all events by id and add
        const eventID = values.eventID;
        console.log(eventID);
        patchEventToCase(caseData?.case_number, {
            events: [...caseData?.events, eventID]
        }).then((patchedCase: any | null) => {
            if (!patchedCase) {
                message.error("Cannot patch event to the case!");
                setExistingVisible(false);
                return;
            }
            const patchedEvent = allEventsData.filter((event: any) => {
                return eventID === event.id;
            });
            console.log(patchedEvent[0]);
            setEventsData([...eventsData, patchedEvent[0]]);
        });
        setExistingVisible(false);
    };

    const disabledDate = (current: any) => {
        return (
            current &&
            (current <
                moment(caseData?.date_of_onset_of_symptoms).subtract(
                    14,
                    "days"
                ) ||
                current >
                    moment(
                        caseData?.date_of_confirmation_of_infection_by_testing
                    ).endOf("day"))
        );
    };

    return (
        <>
            <AddEventDataModal
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                disabledDate={disabledDate}
            />
            <AddExistingEventDataModal
                visible={existingVisible}
                onCreate={onExistingCreate}
                onCancel={() => {
                    setExistingVisible(false);
                }}
                allEvents={allEventsData ? allEventsData : []}
                alreadyAddedEvents={caseData ? caseData?.events : []}
            />
            <br />
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
            <br />
            <div className="ant-descriptions-header">
                <div className="ant-descriptions-title">
                    Social Events attended
                </div>
                <Space>
                    <Button
                        onClick={handleAdd}
                        type="primary"
                        style={{
                            marginBottom: 16
                        }}
                        disabled={buttonDisable}
                    >
                        Add New Event
                    </Button>

                    <Button
                        onClick={handleExistingAdd}
                        type="primary"
                        style={{
                            marginBottom: 16
                        }}
                        disabled={buttonDisable}
                    >
                        Add Existing Event
                    </Button>
                </Space>
            </div>
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            history.push(`/event-data/${record.id}`);
                        }
                    };
                }}
                columns={columns}
                dataSource={eventsData}
                rowKey={"id"}
            />
        </>
    );
};
