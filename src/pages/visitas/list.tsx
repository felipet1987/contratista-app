import {HttpError, IResourceComponentsProps} from "@refinedev/core";

import {
    List,
    useTable,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect, useDrawerForm, Create,
} from "@refinedev/antd";

import {Table, Space, Select, Drawer, Form, Input} from "antd";

import {IPost, ICategory, IVisita, ITarea, ICliente} from "interfaces";
import React from "react";
import TextArea from "antd/es/input/TextArea";

export const VisitList: React.FC<IResourceComponentsProps> = () => {
    const {tableProps, sorter} = useTable<IVisita>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        metaData: {
            select: "*, clientes(nombre)",
        },
    });

    const {formProps, drawerProps, show, close, saveButtonProps} = useDrawerForm<
        IVisita,
        HttpError,
        IVisita
    >({
        action: "create",
    });
    const {selectProps: categorySelectProps} = useSelect<ICliente>({
        resource: "clientes",
        optionValue: "id",
        optionLabel: "nombre"
    });

    return (
        <>
            <List
                title={"Visitas Tecnicas"}
                canCreate

                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
            >
                <Table {...tableProps} rowKey="id">
                    {/*<Table.Column*/}
                    {/*    key="id"*/}
                    {/*    dataIndex="id"*/}
                    {/*    title="ID"*/}
                    {/*    sorter*/}
                    {/*    defaultSortOrder={getDefaultSortOrder("id", sorter)}*/}
                    {/*/>*/}
                    <Table.Column
                        key="titulo"
                        dataIndex="titulo"
                        title="Titulo"
                        sorter
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
                    <Table.Column<IVisita>
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record) => (
                            <Space>
                                <EditButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            <Drawer {...drawerProps}>
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
                            <Input/>
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
                            <TextArea rows={4}/>
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
                            <Select {...categorySelectProps} />
                        </Form.Item>
                    </Form>
                </Create>
            </Drawer>
        </>

    )
        ;
};
