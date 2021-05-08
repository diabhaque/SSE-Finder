import { Modal, Form, Input, Select } from "antd";
import React, { createRef } from "react";

interface AddExistingEventDataModalProps {
    visible: boolean;
    onCreate: (values: Location) => void;
    onCancel: () => void;
    allEvents: any[];
    alreadyAddedEvents: any[];
}

const { Option } = Select;

export const AddExistingEventDataModal = ({
    visible,
    onCreate,
    onCancel,
    allEvents,
    alreadyAddedEvents
}: AddExistingEventDataModalProps) => {
    const [form] = Form.useForm();
    const formRef: any = createRef();

    const remainingEvents = alreadyAddedEvents ? allEvents.filter((event: any) => {
        return !alreadyAddedEvents.includes(event.id);
    }) : [];

    const options = remainingEvents.map((event) => (
        <Option key={event.id} value={event.id}>
            {`${event.id}, ${event.venue_location}`}
        </Option>
    ));

    return (
        <Modal
            visible={visible}
            title="Add an existing Location"
            okText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form
                form={form}
                ref={formRef}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: "public" }}
            >
                <Form.Item
                    name="eventID"
                    label="Select Event"
                    rules={[
                        {
                            required: true,
                            message: "Please select an Existing Event!"
                        }
                    ]}
                >
                    <Select onChange={(value)=>{
                        form.setFieldsValue({'eventID': value})
                    }}>{options}</Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
