import { useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { Create, useForm, useSelect } from "@refinedev/antd";

import { RcFile } from "antd/lib/upload/interface";
import { Form, Input, Select, Upload } from "antd";

import MDEditor from "@uiw/react-md-editor";

import {IVisita, ICliente} from "interfaces";
import { supabaseClient, normalizeFile } from "utility";

export const VisitCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IVisita>();

    const { selectProps: categorySelectProps } = useSelect<ICliente>({
        resource: "clientes",
        optionValue: "id",
        optionLabel: "nombre"
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Titulo"
                    name="titulo"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ubicacion"
                    name="ubicacion"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Cliente"
                    name="cliente"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    {/*<Select {...categorySelectProps} />*/}
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Detalles"
                    name="detalles"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>
            </Form>
        </Create>
    );
};
