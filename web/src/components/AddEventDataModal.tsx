import { Modal, Form, Input, DatePicker, message, Button } from "antd";
import { createRef } from "react";
import { getLocation } from "../client/requests"

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
    const formRef: any = createRef();   

    //Leaving all as any for now, save time
    const getAddress = () => {
        const venueLocation = formRef.current.getFieldValue("venueLocation");
        getLocation(venueLocation).then((fetchedLocation: any) => {
            if (!fetchedLocation) {
                message.error('Cannot get location from GeoData!');
                return;
            }
            formRef.current.setFieldsValue({
                address: fetchedLocation.addressEN,
                x: fetchedLocation.x,
                y: fetchedLocation.y
                });
        })
    };


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
                ref={formRef}
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
                    <div style={{display: "flex"}}>
                        <Input />
                        <Button
                            onClick={getAddress}
                            type="primary"
                            style={{marginLeft: 16}}
                        >
                                Get Address
                        </Button>
                    </div>
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
                    name="x"
                    label="HK1980 X Coordinate"
                    rules={[
                        {
                            required: true,
                            message: "Please input the X Coordinate"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="y"
                    label="HK1980 Y Coordinate"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Y Coordinate"
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
