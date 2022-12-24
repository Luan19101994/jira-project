import React, {useEffect, useState } from 'react'
import { Modal, Avatar, Select, Input } from 'antd';
import { getPriority, getTaskDetail } from '../../service/TaskService';
import SelectAssigner from './SelectAssigner';
function DetailModal(props) {
    const [priority, setPriority] = useState([])
    const [task, setTask] = useState({})
    useEffect(() => {
        async function fetchData() {
          const { content } = await getPriority()
          setPriority(content)
        }
        async function fetchTask() {
          const { content } = await getTaskDetail(props.idTask)
          setTask(content)
        }
        fetchTask()
        fetchData()
      },[props.idTask])
    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }
    return (
        <Modal width={1000} title={ task?.taskName} open={props.status} onOk={props.confirm} onCancel={props.cancel}>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-8">
                    <p>
                        Description:
                    </p>
                    <p  className="mb-5">{task?.description}</p>
                    <p className="mb-5">
                    Comment
                    </p>
                    <div className="flex items-center gap-4 mb-4 w-75">
                        <Avatar size="large" src="https://genk.mediacdn.vn/2016/2-1477373572787.jpg" />
                        <Input size="small" placeholder="Add Comment"/>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar size="large" src="https://genk.mediacdn.vn/2016/2-1477373572787.jpg" />
                        <p>Lorem Ipsum je považováno za standard v této oblasti už od začátku</p>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex items-center gap-4">
                        <p>Status</p>
                        {
                            task?.statusId === "3" && <p className="px-4 py-2 rounded-md border text-[#ff8500] text-sm border-[yellow] bg-[#fbf1e6] w-fit">INPROGRESS</p>
                        }
                        {
                            task?.statusId === "2" && <p className="px-4 py-2 rounded-md border text-[#ff8500] text-sm border-[yellow] bg-[#fbf1e6] w-fit">DEVELOPMENT</p>
                        }
                        {
                            task?.statusId === "4" && <p className="px-4 py-2 rounded-md border text-[green] text-sm border-[yellow] bg-[#14f10042] w-fit">COMPLETED</p>
                        }
                        {
                            task?.statusId === "1" && <p className="px-4 py-2 rounded-md border text-[green] text-sm border-[yellow] bg-[#14f10042] w-fit">BACKLOG</p>
                        }

                    </div>
                    <div className="flex items-center mt-4 gap-4">
                        <p>Assignees</p>
                        <Avatar.Group maxCount={10} maxStyle={{ color: 'green', backgroundColor: '#f6ffed', borderColor: 'green' }}>
                            {

                                task?.assigness?.map(
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
                        </Avatar.Group>
                    </div>
                    <div className="mt-4">
                        
                    <SelectAssigner />
                    </div>
                    <div className="flex items-center mt-4 gap-4">
                        <p>Priority</p>
                        <Select
                            defaultValue="High"
                            style={{
                                width: 120,
                            }}
                            allowClear
                            options={priority.map(e => ({
                                value: e.priorityId,
                                label: e.priority
                            }))}
                        />
                    </div>
                    <div className="flex items-center mt-4 gap-4">
                        <p>Original Estimate (Hours) : </p>
                        <p className="h-6 px-2 rounded-full bg-[#fbf1e6] text-[#ff8500] flex items-center justify-center mt-0">
                            {task?.originalEstimate}
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DetailModal