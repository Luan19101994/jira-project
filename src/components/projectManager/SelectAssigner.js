import React, { useState, useEffect, useContext } from 'react'
import { Select } from 'antd';
import { getAllUser } from '../../service/UserService'
import { ProjectManagerContext } from '../../context/ProjectManagerContext';
function SelectAssigner({ project }) {
    const { Option } = Select;
    const { setAssignees } = useContext(ProjectManagerContext);
    const handleChange = (value) => {
        setAssignees(value)
    };
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function fetchUsers() {
            const { content } = await getAllUser()
            setUsers(content)
        }
        fetchUsers()
    }, []);
    return (
        <div className="assigner">
            <Select
                mode="multiple"
                style={{
                    width: '100%',
                }}
                placeholder="Select User"
                defaultValue={project?.members.map(e => <div key={e.name}></div>) || []}
                onChange={handleChange}
                optionLabelProp="label"
                filterOption={(input, option) => (option?.name ?? '').includes(input)}
            >
                {
                    users.map(e => {
                        return <Option value={e.userId} label={e.name}>
                            <div className="demo-option-label-item">
                                <span role="img" aria-label={e.email}>
                                    {e.name}
                                </span>
                                {` (${e.email}`}
                            </div>
                        </Option>
                    }
                    )
                }
            </Select>
        </div>
    )
}

export default SelectAssigner