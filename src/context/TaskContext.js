
import React, { useState, createContext, useEffect } from 'react'
import { getAllCategory } from '../service/CategoryService'
import { getStatus, getPriority, getTaskType } from '../service/TaskService'
const TaskContext = createContext()
function TaskProvider({ children }) {
    const [categories, setCategories] = useState([])
    const [status, setStatus] = useState([])
    const [priority, setPriority] = useState([])
    const [taskType, setTaskType] = useState([])


    useEffect(() => {
        async function fetchCategory() {
            const { content } = await getAllCategory()
            setCategories(content)
        }
        async function fetchStatus() {
            const { content } = await getStatus()
            setStatus(content)
        }
        async function fetchPriority() {
            const { content } = await getPriority()
            setPriority(content)
        }
        async function fetchTaskType() {
            const { content } = await getTaskType()
            setTaskType(content)
        }
        fetchCategory()
        fetchStatus()
        fetchPriority()
        fetchTaskType()
    }, []);
    const value = {
        categories, setCategories,
        status, setStatus,
        priority, setPriority,
        taskType, setTaskType
    }
    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}
export { TaskProvider, TaskContext }