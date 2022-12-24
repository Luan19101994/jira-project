import '../../assets/css/ProjectManager.css';
import Draw from '../../components/projectManager/Draw';
import Table from '../../components/projectManager/Table'
function ProjectManager() {
  
  return (
    <div className="projectManager">
      <h5 className='mb-5 font-semibold'>PROJECT MANAGER</h5>
      <Table />
      <Draw />
    </div>
  );
}

export default ProjectManager;
