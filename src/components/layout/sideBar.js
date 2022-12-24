import React, { useState, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Menu,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Slider,
  InputNumber,
  Drawer,
} from "antd";
import {
  UsergroupAddOutlined,
  PlusOutlined,
  SettingOutlined,
  CarryOutOutlined,
  UnorderedListOutlined,
  BookOutlined,
  BugOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { ProjectManagerContext } from "../../context/ProjectManagerContext";
import { TaskContext } from "../../context/TaskContext";
import SelectAssigner from "../projectManager/SelectAssigner";
import { AuthContext } from "../../context/AuthContext";
import { createTask } from "../../service/TaskService";
export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectId, setProjectId] = useState();

  const { assignees, projects } = useContext(ProjectManagerContext);
  const { status, priority, taskType } = useContext(TaskContext);
  const [drwaer, setDrawer] = useState(false);

  const { curentUser } = useContext(AuthContext);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (value) => {
    setProjectId(value);
  };

  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await createTask({
      ...values,
      description: content,
      listUserAsign: assignees,
      projectId,
    });
    setIsModalOpen(false);
    console.log("Success:", {
      ...values,
      description: content,
      listUserAsign: assignees,
      projectId,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const rules = {
    taskName: [{ required: true, message: "Please input your Task Name!" }],
    name: [{ required: true, message: "Please input your Name Project!" }],
    statusId: [
      { required: true, message: "Please input your Status Project!" },
    ],
    priority: [
      { required: true, message: "Please input your Priority Project!" },
    ],
    typeTask: [{ required: true, message: "Please input your Ttype Task!" }],
  };

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const logOut = () => {
    localStorage.removeItem("curentUser");
    navigate("/login");
  };

  return (
    <>
      <div className="w-full sm:w-[270px] h-auto sm:h-screen overflow-y-hidden bg-[#fff7ed]">
        <div
          onClick={openDrawer}
          className="sm:hidden text-black z-10 flex items-center px-8 my-5 gap-3"
        >
          <UnorderedListOutlined style={{ fontSize: 20 }} />
          <span className="text-2xl">Jira by Ngoc Luan</span>
        </div>
        <div className="px-5 sm:flex flex-col h-full justify-between hidden">
          <div className="flex gap-5 items-center px-5 bg-[#fff7ed] my-10">
            <div>
              <Link to="/">
                <h2 className="text-3xl font-semibold mb-2 text-prim-100">
                  Jira Project
                </h2>
              </Link>
              <span>By Ngoc Luan</span>
            </div>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["/"]}
            className="!border-r-0 bg-[#fff7ed]"
          >
            <Menu.Item
              key="1"
              icon={<SettingOutlined style={{ fontSize: 20 }} />}
            >
              <Link to={"/projectmanagement"}>Project management</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<PlusOutlined style={{ fontSize: 20 }} />}>
              <Link to={"/createproject"}>Create project</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<UsergroupAddOutlined style={{ fontSize: 20 }} />}
            >
              <Link to={"/usermanagement"}>User management</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<CarryOutOutlined style={{ fontSize: 20 }} />}
            >
              <Link to={"/releases"}>Releases</Link>
            </Menu.Item>
            <Menu.Item
              key="11"
              icon={<UnorderedListOutlined style={{ fontSize: 20 }} />}
            >
              <Link to={"/issues"}>Issues and filters</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<BookOutlined style={{ fontSize: 20 }} />}>
              <Link to={"/pages"}>Pages</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<BugOutlined style={{ fontSize: 20 }} />}>
              <Link to={"/reports"}>Reports</Link>
            </Menu.Item>
            <Menu.Item
              key="7"
              icon={<CalendarOutlined style={{ fontSize: 20 }} />}
            >
              <Link to={"/calander"}>Calander</Link>
            </Menu.Item>
          </Menu>
          <div>
            <span className="w-full my-5 h-0.5 bg-black block"></span>
            <span
              className="mb-2 flex items-center gap-3 px-4 hover:bg-prim-100 hover:text-white rounded-md py-2.5 mr-2 duration-300 cursor-pointer"
              onClick={() => showModal()}
            >
              <PlusOutlined style={{ fontSize: 20 }} /> <span>Create task</span>
            </span>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-3">
              <img
                className="rounded-full"
                src={
                  curentUser.avatar ||
                  "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png"
                }
                alt="avatar"
              />
              <div>
                <h4>{curentUser.name || "Trinh Ngoc Luan"}</h4>
                <span>{curentUser.phoneNumber || "Chưa cập nhật"}</span>
              </div>
            </div>
            <span
              className="mb-5 flex mt-5 items-center gap-3 px-4 hover:bg-prim-100 hover:text-white rounded-md py-2.5 mr-2 duration-300 cursor-pointer"
              onClick={() => logOut()}
            >
              <LogoutOutlined style={{ fontSize: 20 }} /> <span>Đăng xuất</span>
            </span>
          </div>
        </div>

        <Modal
          destroyOnClose
          width={1000}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
          centered
        >
          <div className="max-h-[740px] overflow-y-scroll create-task">
            <h5 className="mb-5  font-semibold">CREATE TASK</h5>
            <Form
              layout="vertical"
              name="register"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="w-full mt-5"
            >
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  label="Project"
                  name="categoryId"
                  rules={rules.category}
                >
                  <Select
                    showSearch
                    placeholder="Select a project"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={projects.map((e) => ({
                      value: e.id,
                      label: e.projectName,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label="Task Name"
                  name="taskName"
                  rules={rules.taskName}
                >
                  <Input placeholder="Task Name" />
                </Form.Item>
                <div className="col-span-2 grid grid-cols-3 gap-5">
                  <Form.Item
                    label="Status"
                    name="statusId"
                    rules={rules.statusId}
                  >
                    <Select
                      showSearch
                      placeholder="Status"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={status.map((e) => ({
                        value: e.statusId,
                        label: e.statusName,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Priotity"
                    name="priorityId"
                    rules={rules.priorityId}
                  >
                    <Select
                      showSearch
                      placeholder="Select priorityId"
                      optionFilterProp="items"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={priority.map((e) => ({
                        value: e.priorityId,
                        label: e.priority,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item label="Type Task" name="typeId" rules={rules.type}>
                    <Select
                      showSearch
                      placeholder="Select Type"
                      optionFilterProp="items"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={taskType.map((e) => ({
                        value: e.id,
                        label: e.taskType,
                      }))}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Assigness"
                  name="listUserAsign"
                  rules={rules.listUserAsign}
                >
                  <SelectAssigner />
                </Form.Item>
                <Form.Item
                  label="Time Tracking"
                  name="timeTracking"
                  defaultValue={0}
                  rules={rules.timeTrackingSpent}
                >
                  <Slider range defaultValue={[20, 50]} />
                </Form.Item>

                <Form.Item
                  label="Original Estimate"
                  name="originalEstimate"
                  defaultValue={0}
                  rules={rules.originalEstimate}
                >
                  <Input placeholder="Original Estimate" />
                </Form.Item>
                <div className="grid grid-cols-2 gap-5">
                  <Form.Item
                    label="Time Spent"
                    name="timeTrackingSpent"
                    rules={rules.timeTrackingSpent}
                    defaultValue={0}
                  >
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={0}
                      className="w-full"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Time Remain"
                    name="timeTrackingRemaining"
                    rules={rules.timeTrackingRemaining}
                    defaultValue={0}
                  >
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={0}
                      className="w-full"
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item label="Description" name="description">
                <Editor
                  id="createTask"
                  name="description"
                  apiKey="ikxdn5hg20ywcdqfjxtcs5isir0r091kal0lrngj7ex98881"
                  init={{
                    selector: "textarea#createTaskTextArea",
                    height: 300,
                    menubar: false,
                    plugins: ["image", "code", "table", "link", "media"],
                    toolbar:
                      "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code",
                  }}
                  onEditorChange={(content, editor) => {
                    setContent(content);
                  }}
                />
              </Form.Item>
              <div className="flex gap-5 justify-end mt-5">
                <Button className="w-32 !h-10">Cancel</Button>
                <Button className="w-32 !h-10" type="primary" htmlType="submit">
                  Create Project
                </Button>
              </div>
            </Form>
          </div>
        </Modal>

        <Drawer
          placement="right"
          width="270"
          onClose={closeDrawer}
          open={drwaer}
        >
          <div className="flex flex-col justify-center h-full">
            <div className="flex gap-5 items-center px-5">
              <div className="mb-5">
                <h2 className="text-3xl font-semibold mb-2">Jira Project</h2>
                <span>By Ngoc Luan</span>
              </div>
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={["/"]}
              className="!border-r-0"
            >
              <Menu.Item
                key="1"
                icon={<SettingOutlined style={{ fontSize: 20 }} />}
              >
                <Link to={"/projectmanagement"}>Project management</Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<PlusOutlined style={{ fontSize: 20 }} />}
              >
                <Link to={"/createproject"}>Create project</Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<UsergroupAddOutlined style={{ fontSize: 20 }} />}
              >
                <Link to={"/usermanagement"}>User management</Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<CarryOutOutlined style={{ fontSize: 20 }} />}
              >
                <Link to={"/releases"}>Releases</Link>
              </Menu.Item>
              <Menu.Item
                key="11"
                icon={<UnorderedListOutlined style={{ fontSize: 20 }} />}
              >
                <Link to={"/issues"}>Issues and filters</Link>
              </Menu.Item>
              <Menu.Item
                key="5"
                icon={<BookOutlined style={{ fontSize: 20 }} />}
              >
                <Link to={"/pages"}>Pages</Link>
              </Menu.Item>
              <Menu.Item
                key="6"
                icon={<BugOutlined style={{ fontSize: 20 }} />}
              >
                <Link to={"/reports"}>Reports</Link>
              </Menu.Item>
              <Menu.Item
                key="7"
                icon={<CalendarOutlined style={{ fontSize: 20 }} />}
              >
                <Link to={"/calander"}>Calander</Link>
              </Menu.Item>
            </Menu>
            <div>
              <span className="w-full my-5 h-0.5 bg-black block"></span>
              <span
                className="mb-2 flex items-center gap-3 px-4 hover:bg-prim-100 hover:text-white rounded-md py-2.5 mr-2 duration-300 cursor-pointer"
                onClick={() => showModal()}
              >
                <PlusOutlined style={{ fontSize: 20 }} />{" "}
                <span>Create task</span>
              </span>
            </div>
            <div className="mt-auto">
              <div className="flex items-center gap-3">
                <img
                  className="rounded-full"
                  src={
                    curentUser.avatar ||
                    "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png"
                  }
                  alt="avatar"
                />
                <div>
                  <h4>{curentUser.name || "Trinh Ngoc Luan"}</h4>
                  <span>{curentUser.phoneNumber || "Chưa cập nhật"}</span>
                </div>
              </div>
              <span
                className="mb-5 flex mt-5 items-center gap-3 px-4 hover:bg-prim-100 hover:text-white rounded-md py-2.5 mr-2 duration-300 cursor-pointer"
                onClick={() => logOut()}
              >
                <LogoutOutlined style={{ fontSize: 20 }} />{" "}
                <span>Đăng xuất</span>
              </span>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}
