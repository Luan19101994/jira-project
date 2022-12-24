import React, { useState  , createContext, useLayoutEffect } from 'react' 
import { getAllProject } from '../service/ProjectService'
const ProjectManagerContext = createContext() 
function ProjectManagerProvider({children}) {   
    const [showDetail , setShowDetail] = useState(false)  
    const [projects , setProjects] = useState([])  
    const [project , setProject] = useState({})  
    const [categories , setCategories] = useState([])  
    const [assignees , setAssignees] = useState([])  
    const [loading , setLoading] = useState(true)  
    
    useLayoutEffect(() => {
        async function fetchData() {
            const { content } = await getAllProject()
            setProjects(content)
            setLoading(false);
        }
        fetchData()
    }, [setProjects])
    const value = { 
        showDetail,
        setShowDetail,
        project,
        setProject,
        projects, setProjects,
        categories , setCategories,
        assignees , setAssignees,
        loading , setLoading,
    }
    return (
        <ProjectManagerContext.Provider value={value}> 
            {children}
        </ProjectManagerContext.Provider> 
    )
}
export { ProjectManagerProvider, ProjectManagerContext }