import { Modal, Form, Input, DatePicker } from "antd";

interface AddEventDataModalProps {
    visible: boolean;
    onCreate: (values: Location) => void;
    onCancel: () => void;
}

export const AddEventDataModal = ({
    visible,
    onCreate,
    onCancel
}: AddEventDataModalProps) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Add a new Location"
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
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: "public" }}
            >
                <Form.Item
                    name="venueName"
                    label="Venue Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of the Venue!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="venueLocation"
                    label="Venue Location"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Location of the Venue!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Venue Address"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="dateOfEvent"
                    label="Date Of Event"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: "Please select Date of the Event"
                        }
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="descriptions"
                    label="Descriptions"
                    rules={[
                        {
                            required: true,
                            message: "Please input a description of the Event"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
