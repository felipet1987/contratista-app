import {HttpError, IResourceComponentsProps, useCreate} from "@refinedev/core";

import {
    List,
    useTable,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect, useDrawerForm, Create, DateField,
} from "@refinedev/antd";
const { Title, Paragraph, Text, Link } = Typography;

import {Table, Space, Select, Button, Progress, Drawer, Form, Input, DatePicker, InputNumber, Typography} from "antd";

import {IPost, ICategory, IVisita, ITarea} from "interfaces";
import React from "react";
import TextArea from "antd/es/input/TextArea";
import {useParams} from "react-router-dom";

export const TareasList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<ITarea>({
        resource: "tareas",
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        // metaData: {
        //     select: "*, clientes(nombre)",
        // },
    });
    const { mutate } = useCreate();

    const { formProps, drawerProps, show,close, saveButtonProps } = useDrawerForm<
        ITarea,
        HttpError,
        ITarea
    >({
        action: "create",
    });
    const { formProps : editFormProps,
        drawerProps: editDrawerProps,
        show: showEdit,
        saveButtonProps:editSaveButtonProps } = useDrawerForm<
        ITarea,
        HttpError,
        ITarea
    >({
        action: "create",
    });

    // const { selectProps } = useSelect<ICategory>({
    //     resource: "categories",
    // });

    let { visita } = useParams();


    return (
        <>
            {/*<Title>{visita}</Title>*/}
            <List
                canCreate
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column
                        key="titulo"
                        dataIndex="titulo"
                        title="Titulo"
                        sorter
                    />
                    <Table.Column
                        key="fecha_inicio"
                        dataIndex="fecha_inicio"
                        title="Inicio"
                        render={(value) => (
                            <DateField value={value} />
                        )}
                    />
                    <Table.Column
                        key="porcentaje"
                        dataIndex="porcentaje"
                        title="Avance"
                        render={(value: number) => <Progress type="dashboard" percent={value} />}
                    />
                    {/*<Table.Column*/}
                    {/*    key="categoryId"*/}
                    {/*    dataIndex={["categories", "title"]}*/}
                    {/*    title="Category"*/}
                    {/*    defaultSortOrder={getDefaultSortOrder(*/}
                    {/*        "categories.title",*/}
                    {/*        sorter,*/}
                    {/*    )}*/}
                    {/*    filterDropdown={(props) => (*/}
                    {/*        <FilterDropdown {...props}>*/}
                    {/*            <Select*/}
                    {/*                style={{ minWidth: 200 }}*/}
                    {/*                mode="multiple"*/}
                    {/*                placeholder="Select Category"*/}
                    {/*                {...selectProps}*/}
                    {/*            />*/}
                    {/*        </FilterDropdown>*/}
                    {/*    )}*/}
                    {/*/>*/}
                    <Table.Column<ITarea>
                        title="Acciones"
                        dataIndex="actions"
                        render={(_, record) => (
                            <Space>
                                <Button
                                    onClick={() => { showEdit()}}
                                >Actualizar</Button>
                                {/*<ShowButton*/}
                                {/*    hideText*/}
                                {/*    size="small"*/}
                                {/*    recordItemId={record.id}*/}
                                {/*/>*/}
                            </Space>
                        )}
                    />
                </Table>
            </List>

            <Drawer {...drawerProps}>
                <Create saveButtonProps={saveButtonProps}
                        footerButtons={({ defaultButtons }) => (
                            <>
                                {/*{defaultButtons}*/}
                                <Button type="primary"
                                        onClick={() => {
                                            let fieldsValue = formProps.form.getFieldsValue();
                                            mutate({
                                                resource: "tareas",
                                                values: {
                                                    visita: visita,
                                                    titulo: fieldsValue.titulo,
                                                    fecha_inicio: fieldsValue.fecha_inicio,
                                                    fecha_termino: fieldsValue.fecha_termino,
                                                    descripcion: fieldsValue.description,
                                                    porcentaje: fieldsValue.porcentaje,
                                                },
                                            });
                                            close();
                                        }}
                                >Custom Button</Button>
                            </>
                        )}
                >
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
                            label="Descripcion"
                            name="descripcion"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="Inicio"
                            name="fecha_inicio"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item
                            label="Termino"
                            name="fecha_termino"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item
                            label="Avance"
                            name="porcentaje"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber min={1} max={100} defaultValue={0} />
                        </Form.Item>

                    </Form>
                </Create>
            </Drawer>
            <Drawer {...editDrawerProps}>
                {/*<Create saveButtonProps={saveButtonProps}>*/}
                {/*    <Form {...formProps} layout="vertical">*/}
                {/*        <Form.Item*/}
                {/*            label="Title"*/}
                {/*            name="title"*/}
                {/*            rules={[*/}
                {/*                {*/}
                {/*                    required: true,*/}
                {/*                },*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            <Input />*/}
                {/*        </Form.Item>*/}
                {/*    </Form>*/}
                {/*</Create>*/}
            </Drawer>
        </>

    );
};
