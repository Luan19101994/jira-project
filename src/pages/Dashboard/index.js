import '../../assets/css/Dashboard.css';
function Dashboard() {
  return (
    <div className="dashboard h-screen flex justify-center flex-col items-center">
        <div className="flex items-center justify-center gap-5 flex-col">
          <img className='w-full max-w-2xl' src="/images/errorpage.png" alt='/'/>
          <h5>Tính năng đang cập nhật</h5>
        </div>
    </div>
  );
}

export default Dashboard;
