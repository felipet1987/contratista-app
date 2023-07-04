import {useShow, IResourceComponentsProps, useOne, HttpError, useCreate, useList} from "@refinedev/core";

import {
    Show,
    MarkdownField,
    ImageField,
    ListButton,
    EditButton,
    RefreshButton, Create, List, useEditableTable, ShowButton, useTable, useDrawerForm, useSimpleList,
} from "@refinedev/antd";

import {
    Typography,
    Space,
    Alert,
    Button,
    TabsProps,
    Tabs,
    Descriptions,
    Table,
    Tag,
    Progress,
    Form,
    Drawer,
    Select, Input, DatePicker, Card
} from "antd";

import { IVisita, ITarea} from "interfaces";
import React, {useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Link} from "react-router-dom";

const {Title, Text} = Typography;

export const VisitShow: React.FC<IResourceComponentsProps> = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);

    const {queryResult} = useShow<IVisita>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
    });

    const { mutate } = useCreate();

    const { formProps, drawerProps, show,close, saveButtonProps } = useDrawerForm<
        ITarea,
        HttpError,
        ITarea
    >({
        action: "create",
    });








    const {data, isLoading} = queryResult;
    const record = data?.data;

    const { tableQueryResult, tableProps } = useTable<ITarea, HttpError>(
        {
            resource: "tareas"
        }
    );
    const { listProps } = useSimpleList<ITarea>();
    const { data: tareas, isError } = useList<ITarea, HttpError>({
        resource: "tareas",
    });

    const onChange = (key: string) => {
        console.log(key);
    };

    let Info: React.FC<IResourceComponentsProps> = () =>
        <Card>
            <Descriptions title="Informacion" layout="vertical" bordered>
                <Descriptions.Item label="Titulo">{record?.titulo}</Descriptions.Item>
                <Descriptions.Item label="Ubicacion">{record?.ubicacion}</Descriptions.Item>

            </Descriptions>
            <Descriptions title="" layout="vertical" bordered>
                <Descriptions.Item label="Detalles">{record?.detalles}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="Cliente">
                <Descriptions.Item label="Cliente">Zhou Maomao</Descriptions.Item>
                {/*<Descriptions.Item label="Telephone">1810000000</Descriptions.Item>*/}
                {/*<Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>*/}
            </Descriptions>
            <Space direction="horizontal" style={{ width: '100%' }}>

                <Link to={"/tareas/" + record?.id}>
                    Orden de Trabajo
                </Link>
                <Button type="link" block>
                    Presupuesto
                </Button>
            </Space>
        </Card>




    return (
        <Show
            isLoading={isLoading}
            // headerProps={{
            //     extra: (
            //         <>
            //             <ListButton />
            //             <EditButton />
            //             <RefreshButton onClick={handleRefresh} />
            //         </>
            //     ),
            // }}
        >
            <Title>{record?.titulo}</Title>
            <Info/>
        </Show>
    );
};
