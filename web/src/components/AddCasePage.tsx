import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Form, Input, Button, Spin, DatePicker } from "antd";

export const AddCasePage = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        const formData = {
            caseNumber: values.caseNumber,
            personName: values.surname + ", " + values.otherNames,
            idNumber: values.idNumber,
            dateOfBirth: values.dateOfBirth.format("DD-MM-YYYY"),
            dateOfOnset: values.dateOfOnset.format("DD-MM-YYYY"),
            dateOfCaseConfirmed: values.dateOfCaseConfirmed.format("DD-MM-YYYY")
        };

        await new Promise((r) => setTimeout(r, 1000));
        // POST request to the backend. 
        // If success, redirect to 

        console.log(formData);
        setLoading(false);
        history.push(`/case-data/${formData.caseNumber}`);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div style={{ padding: "5vh 10vw" }}>
            <Form
                // {...formItemLayout}
                layout="vertical"
                form={form}
                name="Add Case"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
            >
                <Form.Item
                    name="caseNumber"
                    label="Case Number"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: "Please input Case Number"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="surname"
                    label="Surname"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: "Please input Person's Surname"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="otherNames"
                    label="Other Names"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: "Please input Person's Other Names"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="idNumber"
                    label="Identity Document Number"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please input the Person's Identity Document Number"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="dateOfBirth"
                    label="Date Of Birth"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: "Please select Date of Birth"
                        }
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="dateOfOnset"
                    label="Date Of Onset"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: "Please select Date of Onset"
                        }
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="dateOfCaseConfirmed"
                    label="Date Of Case Confirmed"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: "Please select Date of Case Confirmed"
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
                            Add Case
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
};
