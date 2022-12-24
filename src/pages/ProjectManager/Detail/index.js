import '../../../assets/css/ProjectManager.css';
import { useLayoutEffect, useContext} from 'react';
import { useParams } from 'react-router-dom'
import TaskList from '../../../components/projectManager/TaskList'
import { getDetail } from '../../../service/ProjectService' 
import { ProjectManagerContext } from '../../../context/ProjectManagerContext';
function DetailProject({ props }) {
    const {  project, setProject } = useContext(ProjectManagerContext);
    let { id } = useParams()
    useLayoutEffect(() => {
        async function fetchData() {
          const { content } = await getDetail(id)
          setProject(content)
        }
        fetchData()
      },[id, setProject])
    console.log(project)
  return (
    <div className="detailProject">
      
      <h5 className='mb-5 font-semibold'>{`PROJECT MANAGER > ${project.projectName }` }</h5>
        <TaskList  tasks={project.lstTask || [] }/>
    </div>
  );
}

export default DetailProject;
