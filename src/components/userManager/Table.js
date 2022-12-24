import React, { useState, useContext,useEffect } from 'react';
import '../../assets/css/UserManager.css';
import { Table } from "rsuite";
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { UserManagerContext } from '../../context/UserManagerContext';
import Modal from './Modal';
import { getAllUser, deleteUser } from '../../service/UserService';
import { message } from 'antd';
function Index() {

    const { setShowDetail, users, setUsers, user, setUser } = useContext(UserManagerContext);
    const { Column, HeaderCell, Cell } = Table;
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const getData = () => {
        if (sortColumn && sortType) {
            return users.sort((a, b) => {
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
        return users;
    };
    useEffect(() => {
        if (!users) {
         async function fetchData() {
             const { content } = await getAllUser()
             setUsers(content)
           }
           fetchData()
        }
        else {
         setLoading(false);
        }
       },[setUsers, users])
    const deleteAction = async (id) => {
        setOpenModal(false)
        deleteUser(id).then(async (res) => {
            message.success('Xóa thành công')
            const { content } =await getAllUser();
            setUsers(content)
        })
        .catch((err) => {
            message.error(err.response.data.content)
        })
    }
    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };
    const Id = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", }}>
            <p className="font-thin">{rowData[dataKey] === "" ? "--" : rowData[dataKey]}</p>
        </Cell>
    );

    const UserName = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", }}>
            <p  className="font-thin">{rowData[dataKey] === "" ? "--" : rowData[dataKey]}</p>
        </Cell>
    );

    const Email = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", }}>
            <p className="font-thin">{rowData[dataKey] === "" ? "--" : rowData[dataKey]}</p>
        </Cell>
    );
    const Actions = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", gap: '10px', padding: '5px' }}>
            <button className="w-8 h-8 text-white flex items-center justify-center bg-[#1677ff] rounded-md"
                onClick={() => setShowDetail(true)}>
                <EditFilled />
            </button>
            <button className="w-8 h-8 text-white flex items-center justify-center bg-[#ff5500]  rounded-md" onClick={() => {
                setOpenModal(true)
                setUser(rowData)
            }}>
                <DeleteFilled />
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
                loading={loading}
            >
                <Column resizable width={100} align="center" fixed>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Id
                    </HeaderCell>
                    <Id dataKey={"userId"} />
                </Column>
                <Column resizable width={300} align="center" sortable>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        User Name
                    </HeaderCell>
                    <UserName dataKey={"name"} />
                </Column>
                <Column resizable width={600} align="center" sortable>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                    Email
                    </HeaderCell>
                    <Email dataKey="email" style={{ textAlign: "center" }} />
                </Column>

                <Column resizable width={150} fixed="right">
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Action
                    </HeaderCell>
                    <Actions/>
                </Column>
            </Table>
            <Modal value={ user } status={openModal} confirm={() => deleteAction(user.userId)} cancel={() => setOpenModal(false)} />
        </div>
    );
}

export default Index;
