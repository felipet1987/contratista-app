import { IResourceComponentsProps } from "@refinedev/core";

import {
    List,
    useTable,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
} from "@refinedev/antd";

import { Table, Space, Select } from "antd";

import {IPost, ICategory, ICliente} from "interfaces";

export const ClientList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<ICliente>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
    });


    return (
        <List>
            <Table {...tableProps} rowKey="id">
                {/*<Table.Column*/}
                {/*    key="id"*/}
                {/*    dataIndex="id"*/}
                {/*    title="ID"*/}
                {/*    sorter*/}
                {/*    defaultSortOrder={getDefaultSortOrder("uuid", sorter)}*/}
                {/*/>*/}
                <Table.Column
                    key="nombre"
                    dataIndex="nombre"
                    title="Nombre"
                    sorter
                />
                <Table.Column
                    key="correo"
                    dataIndex="correo"
                    title="Correo"
                    sorter
                />
                <Table.Column<ICliente>
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
    );
};
