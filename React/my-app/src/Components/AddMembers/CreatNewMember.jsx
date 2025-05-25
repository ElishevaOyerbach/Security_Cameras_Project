 
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import ALL_PERMISSIONS from '../AddMembers/AllPermissions';
import AxiosCreteMemberByAdministrator from './AxiosCreateMemberByAdministrator';
import { useSelector } from 'react-redux';

const CreatNewMember = ({ visible, onClose }) => {
    const [flag, setFlag] = useState(false);
    const [formData, setFormData] = useState({
        _id: "",
        Name: "",
        email: "",
        phone: "",
        password: "",
        role: "Member",
        prefix:"972",
        AccessPermissions: [],
        administartorID: "",
    });

    const user = useSelector((state) => state.UserSlice);
    const ID = user._id;
    const [form] = Form.useForm();

    const handleOk = () => {
        setFlag(true);
        onClose();
    };

    return (
        <>
            <Modal
                title="Member Details"
                open={visible}
                onOk={handleOk}
                onCancel={onClose}
                okText="Save"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        _id: ID,
                        Name: '',
                        password: '',
                        confirm: '',
                        email: '',
                        phone: '',
                        AccessPermissions: [],
                        administartorID: ID,
                    }}
                    onValuesChange={(changedValues, allValues) => {
                        setFormData(allValues);
                    }}
                >
                    <Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { type: 'email', message: 'The input is not valid E-mail!' },
                            { required: true, message: 'Please input your E-mail!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ type: 'phone', message: 'The input is not valid Phone number!' },
                            { required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="AccessPermissions" label="Permissions">
                        <Select
                            mode="multiple"
                            placeholder="Select Access"
                            options={ALL_PERMISSIONS.map(permission => ({
                                value: permission,
                                label: permission,
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            {flag && <AxiosCreteMemberByAdministrator ID={ID} memberData={formData} />}
        </>
    );
};

export default CreatNewMember;
