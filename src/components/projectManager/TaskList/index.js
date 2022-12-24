import React, { useState, useLayoutEffect } from "react";
import './TaskList.css';
import { Avatar, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons'
import DetailModal from '../../../components/projectManager/DetailModal';
import { getDetail } from '../../../service/ProjectService' 
import  { updateStatus } from '../../../service/TaskService';
import { useParams } from 'react-router-dom'
function TaskList (props) {
  let { id } = useParams()
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idDetail, setIdDetail] = useState();
  useLayoutEffect(() => {
    setTasks(props.tasks)
  },[props.tasks])
  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };
  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };
  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };
  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  const onDrop = async (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    await updateStatus({taskId: data, statusId: status})
    const { content } = await getDetail(id)
    setTasks(content.lstTask)
    console.log("data", data, status);
  };

  const seeDetails = (taskId) => {
    setIdDetail(taskId);
    setOpenModal(true)
  }
  const handleUpdateTask = () => {
    setOpenModal(false)
  }
    // console.log("tasks", tasks);
    let pending = tasks?.filter((data) => data.statusId === "3")[0]?.lstTaskDeTail;
    let done = tasks?.filter((data) => data.statusId === "4")[0]?.lstTaskDeTail;
    let backlog = tasks?.filter((data) => data.statusId === "1")[0]?.lstTaskDeTail;
    let development = tasks?.filter((data) => data.statusId ==='2')[0]?.lstTaskDeTail;
    // console.log(backlog[0].lstTaskDeTail);
  return (
    <div className="container">
      
      <DetailModal idTask={ idDetail } status={openModal} confirm={() => handleUpdateTask()} cancel={() => setOpenModal(false)} />
        <div
          className="order small-box bg-[#fae7e7]"
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, false, "1")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4>BACKLOG</h4>
                  {backlog ? backlog.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.taskId}
                      draggable
                      onDragStart={(e) => onDragStart(e)}
                      onDragEnd={(e) => onDragEnd(e)}
                      onClick={() => seeDetails(task.taskId)}
                    >
                      <h4>{task.taskName} <span>- {task.taskTypeDetail.taskType}</span></h4>
                      {task.image && <img src={task.image} alt='/' className="w-full h-full mb-3 rounded-md" />}
                      <div className="flex justify-between items-center">
                        <Avatar.Group maxCount={3} maxStyle={{ color: 'green', backgroundColor: '#f6ffed', borderColor: 'green' }}>
                          {

                            task.assigness?.map(
                              (rep, index) => {
                                if (rep.avatar) {
                                  return <Avatar src={rep.avatar} key={index}/>
                                }
                                else {
                                  return <Avatar style={{ backgroundColor: '#f56a00' }} key={index}>{rep.name?.charAt(0)}</Avatar>
                                }
                              }

                            )
                          }
                        </Avatar.Group>
                        <Tooltip title="See more">
                          <MoreOutlined />
                        </Tooltip>
                      </div>
                    </div>
                  ))
                :
                  <div>
                    Không có dữ liệu
                  </div>
                }
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="pending small-box bg-[#fbf1e6]"
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, false, "3")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4>In Progress</h4>
                  {pending ? pending.map((task) => (
                    <div
                      className="card"
                      key={task.taskName}
                      id={task.taskId}
                      draggable
                      onDragStart={(e) => onDragStart(e)}
                      onDragEnd={(e) => onDragEnd(e)}
                      onClick={() => seeDetails(task.taskId)}
                    >
                      <h4>{task.taskName} <span>- {task.taskTypeDetail.taskType}</span></h4>
                      {task.image && <img src={task.image} alt='/' className="w-full h-full mb-3 rounded-md" />}
                      <div className="flex justify-between items-center">
                        <Avatar.Group maxCount={3} maxStyle={{ color: 'green', backgroundColor: '#f6ffed', borderColor: 'green' }}>
                          {

                            task.members?.map(
                              (rep, index) => {
                                if (rep.avatar) {
                                  return <Avatar src={rep.avatar} />
                                }
                                else {
                                  return <Avatar style={{ backgroundColor: '#f56a00' }}>{rep.name.charAt(0)}</Avatar>
                                }
                              }

                            )
                          }
                        </Avatar.Group>
                        <Tooltip title="See more">
                          <MoreOutlined />
                        </Tooltip>
                      </div>
                    </div>
                  )):
                  <div>
                    Không có dữ liệu
                  </div>}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="development small-box bg-[#ebf3fb]"
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, true, "2")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4>Slected for Development</h4>
                  {development ? development.map((task) => (
                    <div
                      className="card"
                      key={task.taskName}
                      id={task.taskId}
                      draggable
                      onDragStart={(e) => onDragStart(e)}
                      onDragEnd={(e) => onDragEnd(e)}
                      onClick={() => seeDetails(task.taskId)}
                    >
                      <h4>{task.taskName} <span>- {task.taskTypeDetail.taskType}</span></h4>
                      {task.image && <img src={task.image} alt='/' className="w-full h-full mb-3 rounded-md" />}
                      <div className="flex justify-between items-center">
                        <Avatar.Group maxCount={3} maxStyle={{ color: 'green', backgroundColor: '#f6ffed', borderColor: 'green' }}>
                          {

                            task.members?.map(
                              (rep, index) => {
                                if (rep.avatar) {
                                  return <Avatar src={rep.avatar} />
                                }
                                else {
                                  return <Avatar style={{ backgroundColor: '#f56a00' }}>{rep.name.charAt(0)}</Avatar>
                                }
                              }

                            )
                          }
                        </Avatar.Group>
                        <Tooltip title="See more">
                          <MoreOutlined />
                        </Tooltip>
                      </div>
                    </div>
                  ))
                  :
                    <div>
                      Không có dữ liệu
                    </div>}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="done small-box bg-[#14f10042]"
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, true, "4")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4>Completed</h4>
                  {done ? done.map((task) => (
                    <div
                      className="card"
                      key={task.taskName}
                      id={task.taskId}
                      draggable
                      onDragStart={(e) => onDragStart(e)}
                      onDragEnd={(e) => onDragEnd(e)}
                      onClick={() => seeDetails(task.taskId)}
                    >
                      <h4>{task.taskName} <span>- {task.taskTypeDetail.taskType}</span></h4>
                      {task.image && <img src={task.image} alt='/' className="w-full h-full mb-3 rounded-md" />}
                      <div className="flex justify-between items-center">
                        <Avatar.Group maxCount={3} maxStyle={{ color: 'green', backgroundColor: '#f6ffed', borderColor: 'green' }}>
                          {

                            task.members?.map(
                              (rep, index) => {
                                if (rep.avatar) {
                                  return <Avatar src={rep.avatar} />
                                }
                                else {
                                  return <Avatar style={{ backgroundColor: '#f56a00' }}>{rep.name.charAt(0)}</Avatar>
                                }
                              }

                            )
                          }
                        </Avatar.Group>
                        <Tooltip title="See more">
                          <MoreOutlined />
                        </Tooltip>
                      </div>
                    </div>
                  ))
                  :
                    <div>
                      Không có dữ liệu
                    </div>}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
  )
}

export default TaskList;
