import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Table } from "rsuite";
import { EditFilled, DeleteFilled, ContactsFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
function Index() {
    const { Column, HeaderCell, Cell } = Table;
    const [sortColumn, setSortColumn] = useState();
    //eslint-disable-next-line
    const [issues, setIssues] = useState([
        {
            id: 1,
            avatar: 'https://genk.mediacdn.vn/2016/2-1477373572787.jpg',
            issueDescription: "Hav some error",
            project: "WEBSITE COBS",
        },
        {
            id: 1,
            avatar: 'https://genk.mediacdn.vn/2016/2-1477373572787.jpg',
            issueDescription: "Hav some error",
            project: "WEBSITE COBS",
        },{
            id: 1,
            avatar: 'https://genk.mediacdn.vn/2016/2-1477373572787.jpg',
            issueDescription: "Hav some error",
            project: "WEBSITE COBS",
        },{
            id: 1,
            avatar: 'https://genk.mediacdn.vn/2016/2-1477373572787.jpg',
            issueDescription: "Hav some error",
            project: "WEBSITE COBS",
        },{
            id: 1,
            avatar: 'https://genk.mediacdn.vn/2016/2-1477373572787.jpg',
            issueDescription: "Hav some error",
            project: "WEBSITE COBS",
        },{
            id: 1,
            avatar: 'https://genk.mediacdn.vn/2016/2-1477373572787.jpg',
            issueDescription: "Hav some error",
            project: "WEBSITE COBS",
        },{
            id: 1,
            avatar: 'https://genk.mediacdn.vn/2016/2-1477373572787.jpg',
            issueDescription: "Hav some error",
            project: "WEBSITE COBS",
        },{
            id: 1,
            avatar: 'https://genk.mediacdn.vn/2016/2-1477373572787.jpg',
            issueDescription: "Hav some error",
            project: "WEBSITE COBS",
        },{
            id: 1,
            avatar: 'https://genk.mediacdn.vn/2016/2-1477373572787.jpg',
            issueDescription: "Hav some error",
            project: "WEBSITE COBS",
        },
    ]);
    const [sortType, setSortType] = useState();
    const getData = () => {
        if (sortColumn && sortType) {
            return issues.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === "string") {
                    x = x.charCodeAt();
                }
                if (typeof y === "string") {
                    y = y.charCodeAt();
                }
                if (sortType === "asc") {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return issues;
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setTimeout(() => {
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };
    const Questioner = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", }}>
            <Avatar src={rowData[dataKey]} />
        </Cell>
    );
    
    const NameProject = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", }}>
            <Link to={`/project/${rowData.id}`} className="font-thin">{rowData[dataKey] === "" ? "--" : rowData[dataKey]}</Link>
        </Cell>
    );
    const Issue = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", }}>
            <Link to={`/issuedetail/${rowData.id}`} className="font-thin">{rowData[dataKey] === "" ? "--" : rowData[dataKey]}</Link>
        </Cell>
    );
    const Actions = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", gap: '10px', padding: '5px' }}>
            <button className="w-8 h-8 text-white flex items-center justify-center bg-[#1677ff] rounded-md"
                onClick={() => {
                }}>
                <EditFilled />
            </button>
            <button className="w-8 h-8 text-white flex items-center justify-center bg-[#ff5500]  rounded-md" onClick={() => {
            }}>
                <DeleteFilled />
            </button>
            <button className="w-8 h-8 text-white flex items-center justify-center bg-[#ff5500]  rounded-md" onClick={() => {
            }}>
                <ContactsFilled />
            </button>
        </Cell>
    );
    return (
        <div className="">
            <Table
                bordered
                cellBordered
                height={600}
                data={getData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
            >
                <Column resizable width={150} align="center" fixed>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Người đặt vấn đề
                    </HeaderCell>
                    <Questioner dataKey={"avatar"} />
                </Column>
                <Column resizable width={250} align="center" sortable>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Name Project
                    </HeaderCell>
                    <NameProject dataKey={"project"} />
                </Column>
                <Column resizable width={450} align="center" sortable>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                       Description
                    </HeaderCell>
                    <Issue dataKey={"issueDescription"} />
                </Column>

                <Column resizable width={150} fixed="right">
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Action
                    </HeaderCell>
                    <Actions />
                </Column>
            </Table>

        </div>
    );
}

export default Index;
