import React, { useState, useContext, useEffect } from "react";
import "../../../assets/css/ProjectManager.css";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, Select, message } from "antd";
import { ProjectManagerContext } from "../../../context/ProjectManagerContext";
import { getAllCategory } from "../../../service/CategoryService";
import { createProject, getAllProject } from "../../../service/ProjectService";
function CreateProject() {
  const { categories, setCategories, setProjects } = useContext(
    ProjectManagerContext
  );
  const [content, setContent] = useState("");

  const onFinish = async (values) => {
    await createProject({ ...values, description: content });
    const data = await getAllProject();
    setProjects(data.content);
    console.log("Success:", { ...values, description: content });
    message.success("Create Success");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const rules = {
    category: [
      { required: true, message: "Please input your Category Project!" },
    ],
    name: [{ required: true, message: "Please input your Name Project!" }],
  };

  useEffect(() => {
    async function fetchData() {
      const { content } = await getAllCategory();
      setCategories(content);
    }
    fetchData();
  }, [setCategories]);
  return (
    <div className="createProject">
      <h5 className="mb-5 font-semibold">CREATE PROJECT </h5>
      <Form
        layout="vertical"
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="w-full mt-10"
      >
        <div className="grid grid-cols-2 gap-5">
          <Form.Item label="Name Project" name="projectName" rules={rules.name}>
            <Input placeholder="Name project" />
          </Form.Item>
          <Form.Item label="Category" name="categoryId" rules={rules.category}>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={categories.map((e) => ({
                value: e.id,
                label: e.projectCategoryName,
              }))}
            />
          </Form.Item>
        </div>
        <Form.Item label="Description" name="description">
          <Editor
            id="createProject"
            name="description"
            apiKey="ikxdn5hg20ywcdqfjxtcs5isir0r091kal0lrngj7ex98881"
            init={{
              selector: "textarea#myTextArea",
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
        <Button
          className="w-32 !h-10 mt-5 !bg-prim-100"
          type="primary"
          htmlType="submit"
        >
          Create Project
        </Button>
      </Form>
    </div>
  );
}

export default CreateProject;
