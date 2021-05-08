import React, { useState } from "react";
import { Button, DatePicker, Form, Spin, Table } from "antd";
import { getEvents } from "../client/requests";

export const FindSsePage = () => {
    const [loading, setLoading] = useState(false);
    const [sseData, setSseData] = useState<any>([]);
    const [allEventsData, setAllEventsData] = useState<any | null>([]);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        const formData = {
            to: values.to.format("YYYY-MM-DD"),
            from: values.from.format("YYYY-MM-DD")
        };

        await new Promise((r) => setTimeout(r, 1000));
        // get request to the backend.

        getEvents()
            .then((fetchedEvents: any | null) => {
                setAllEventsData(fetchedEvents);
                if (fetchedEvents) {
                    const fetchedSseData = fetchedEvents.filter(
                        (fetchedEvent: any) => {
                            return (
                                fetchedEvent.cases.length >= 6 &&
                                new Date(fetchedEvent.date_of_the_event) <=
                                    new Date(formData.to) &&
                                new Date(fetchedEvent.date_of_the_event) >=
                                    new Date(formData.from)
                            );
                        }
                    );
                    console.log(fetchedSseData);
                    setSseData(fetchedSseData);
                    setLoading(false);
                }
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
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
        }
    ];

    return (
        <div>
            <Form
                layout="inline"
                form={form}
                name="Date Range"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
            >
                <Form.Item
                    name="from"
                    label="From"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: "Please select a start date"
                        }
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="to"
                    label="To"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: "Please select an end date"
                        }
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item>
                    {loading ? (
                        <Spin />
                    ) : (
                        <Button type="primary" htmlType="submit">
                            Find SSEs
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <br />
            <Table columns={columns} dataSource={sseData} />
        </div>
    );
};
