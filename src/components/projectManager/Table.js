import React, { useState, useContext, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import '../../assets/css/ProjectManager.css';
import { Table } from "rsuite";
import { EditFilled, DeleteFilled, ContactsFilled, CloseCircleOutlined } from '@ant-design/icons';
import { Avatar, Tag, Modal, Select, message, Dropdown, Button } from 'antd';
import { ProjectManagerContext } from '../../context/ProjectManagerContext';
import { deleteProject, getAllProject, assignUserProject, removeUserFromProject } from '../../service/ProjectService'
import { getAllUser } from '../../service/UserService'
import ModalConfirm from './Modal';
function Index() {
    let assigner = useRef('')
    const { setShowDetail, project, setProject, projects, setProjects, loading, setLoading } = useContext(ProjectManagerContext);
    const { Column, HeaderCell, Cell } = Table;
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openAssignment, setOpenAssignment] = useState(false);
    const [users, setUsers] = useState([])
    useLayoutEffect(() => {
        async function fetchUsers() {
            const { content } = await getAllUser()
            setUsers(content)
        }
        fetchUsers()
    }, [setProjects])
    const getData = () => {
        if (sortColumn && sortType) {
            return projects.sort((a, b) => {
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
        return projects;
    };

    const deleteAction = async (id) => {
        await deleteProject(id)
        const { content } = await getAllProject()
        setProjects(content)
        setOpenModal(false)
    }

    const assignAtion = async (id) => {
        await assignUserProject({
            projectId: id,
            userId: assigner.current,
        }).then(() => {
            message.success("Assign Success");
        })
            .catch((err) => {
                message.error(err.response.data.content)
            })
        const { content } = await getAllProject()
        setProjects(content)
        setOpenAssignment(false)
    }
    const removeUser = async (projectId, userId) => {
        await removeUserFromProject({
            projectId: projectId,
            userId: userId,
        }).then(() => {
            message.success("Remove Success");
        })
            .catch((err) => {
                message.error(err.response.data.content)
            })
        const { content } = await getAllProject()
        setProjects(content)
    }

    const handleChange = (value) => {
        assigner.current = value
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

    const ProjectName = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", }}>
            <Link to={`/projectdetail/${rowData.id}`} className="font-thin">{rowData[dataKey] === "" ? "--" : rowData[dataKey]}</Link>
        </Cell>
    );

    const Category = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", }}>
            <p className="font-thin">{rowData[dataKey] === "" ? "--" : rowData[dataKey]}</p>
        </Cell>
    );
    const Creator = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", }}>
            <Tag color="green"><p className="font-thin">{rowData[dataKey].name === "" ? "--" : rowData[dataKey].name}</p></Tag>
        </Cell>
    );
    const Members = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", padding: '6px' }}>

            <Avatar.Group maxCount={3} maxStyle={{ color: 'green', backgroundColor: '#f6ffed', borderColor: 'green' }}>
                {

                    rowData[dataKey].length > 0 ? <div>
                        {
                            <Dropdown
                                menu={{
                                    items: rowData[dataKey].map((e, index) => ({
                                        key: e.userId,
                                        label: (
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-3">
                                                <Avatar src={e.avatar} key={index} />
                                                <p className="mb-0 mt-3">{e.name}</p>
                                                </div>
                                                <Button onClick={() => {
                                                    removeUser(project.id,e.userId)
                                                }} type="primary" danger shape="circle" icon={<CloseCircleOutlined />} size={'small'} />
                                            </div>
                                        ),
                                    }))
                                }}
                                placement="bottomRight"
                                arrow={{
                                    pointAtCenter: true,
                                }}

                            >
                                <div>
                                {
                                    rowData[dataKey].map(
                                        (rep, index) => {
                                            if (rep.avatar) {
                                                return <Avatar src={rep.avatar} key={index} />
                                            }
                                            else {
                                                return <Avatar style={{ backgroundColor: '#f56a00' }} key={index}>{rep.name?.charAt(0)}</Avatar>
                                            }
                                        }

                                    )
                                }
                                </div>
                            </Dropdown>
                        }
                    </div> : <p>Không có dữ liệu</p>
                }
            </Avatar.Group>
        </Cell>
    );
    const Actions = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ display: "flex", justifyContent: "center", gap: '10px', padding: '5px' }}>
            <button className="w-8 h-8 text-white flex items-center justify-center bg-[#1677ff] rounded-md"
                onClick={() => {
                    setProject(rowData)
                    setShowDetail(true)
                }}>
                <EditFilled />
            </button>
            <button className="w-8 h-8 text-white flex items-center justify-center bg-[#ff5500]  rounded-md" onClick={() => {
                setProject(rowData)
                setOpenModal(true)
            }}>
                <DeleteFilled />
            </button>
            <button className="w-8 h-8 text-white flex items-center justify-center bg-[#ff5500]  rounded-md" onClick={() => {
                setProject(rowData)
                setOpenAssignment(true)
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
                loading={loading}
            >
                <Column resizable width={100} align="center" fixed>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Id
                    </HeaderCell>
                    <Id dataKey={"id"} />
                </Column>
                <Column resizable width={250} align="center" sortable>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Project Name
                    </HeaderCell>
                    <ProjectName dataKey={"projectName"} />
                </Column>
                <Column resizable width={150} align="center" sortable>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Category
                    </HeaderCell>
                    <Category dataKey="categoryName" style={{ textAlign: "center" }} />
                </Column>
                <Column resizable width={200}>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Creator
                    </HeaderCell>
                    <Creator dataKey={"creator"} />
                </Column>
                <Column resizable width={300}>
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Members
                    </HeaderCell>
                    <Members dataKey="members" />
                </Column>

                <Column resizable width={150} fixed="right">
                    <HeaderCell style={{ backgroundColor: "#ff950c", color: "#fff" }}>
                        Action
                    </HeaderCell>
                    <Actions />
                </Column>
            </Table>
            <ModalConfirm value={project} status={openModal} confirm={() => deleteAction(project.id)} cancel={() => setOpenModal(false)} />

            <Modal
                open={openAssignment}
                title="Choose assigneers"
                onOk={() => { assignAtion(project.id) }}
                onCancel={() => setOpenAssignment(false)}
            >
                <Select
                    showSearch
                    style={{
                        width: '100%',
                    }}
                    onChange={handleChange}
                    placeholder="Search User"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    options={users.map(e => ({
                        value: e.userId.toString(),
                        label: e.name,
                    }))}
                />
            </Modal>

        </div>
    );
}

export default Index;
