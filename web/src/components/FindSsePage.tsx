import React, { useState } from "react";
import { Button, DatePicker, Form, Spin, Table } from "antd";

export const FindSsePage = () => {
    const [loading, setLoading] = useState(false);
    const [sseData, setSseData] = useState<any>([]);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        const formData = {
            to: values.to.format("DD-MM-YYYY"),
            from: values.from.format("DD-MM-YYYY")
        };

        await new Promise((r) => setTimeout(r, 1000));
        // get request to the backend.

        const hardCode = {
            venueName: 'A',
            venueLocation: 'B',
            address: 'C',
            dateOfEvent: 'D',
            descriptions: 'E'
        };

        console.log(formData);
        setSseData([...sseData, hardCode]);
        setLoading(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
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
            <Table
                columns={columns}
                dataSource={sseData}
            />
        </div>
    );
};
