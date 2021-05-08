import { useState } from "react";
import { /*Redirect,*/ useHistory } from "react-router-dom";
import { Case } from "../types/caseTypes_trial";
import { Form, Input, Button, Spin, DatePicker, message } from "antd";
import { postCase } from "../client/requests";
import moment from 'moment';

export const AddCasePage = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    //const [error, setError] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        const formData = {
            case_number: null,
            person_name: values.surname + ", " + values.otherNames,
            identify_document_number: values.idNumber,
            date_of_birth: values.dateOfBirth.format("YYYY-MM-DD"),
            date_of_onset_of_symptoms: values.dateOfOnset.format("YYYY-MM-DD"),
            date_of_confirmation_of_infection_by_testing: values.dateOfCaseConfirmed.format("YYYY-MM-DD")
        };
        postCase(formData).then((newCase: Case | null) => {
            if (!newCase) {
                message.error('Cannot add the case to server!');
                setLoading(false);
                return;
            }
            console.log(newCase)
            setLoading(false);
            if (newCase.case_number) {
                history.push(`/case-data/${newCase?.case_number}`);
            }
        })
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
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value) {
                                return Promise.resolve();
                              }

                              if (moment(value) > moment(getFieldValue('dateOfOnset')) || moment(value) > moment(getFieldValue('dateOfOnset'))) {
                                return Promise.reject(new Error('Date of Birth cannot be later than Date of Onset and Date of Case Confirmed!'));
                              }
                
                              return Promise.resolve();
                            },
                          }),
                    ]}
                >
                    <DatePicker defaultPickerValue={moment("1990-01-01")} />
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
