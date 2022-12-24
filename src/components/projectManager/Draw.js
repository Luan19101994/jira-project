import React, { useState, useContext, useEffect } from "react";
import { Drawer } from "rsuite";
import { Form, Button, Input, Select, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { ProjectManagerContext } from "../../context/ProjectManagerContext";
import { updateProject } from "../../service/ProjectService";
import { getAllCategory } from "../../service/CategoryService";
function Draw() {
  const [form] = Form.useForm();
  const { showDetail, setShowDetail, project, categories, setCategories } =
    useContext(ProjectManagerContext);
  const [content, setContent] = useState("");
  const rules = {
    category: [
      { required: true, message: "Please input your Category Project!" },
    ],
    projectName: [
      { required: true, message: "Please input your Name Project!" },
    ],
  };
  const onFinish = async (values) => {
    setShowDetail(false);
    updateProject(project.id, { ...values, description: content })
      .then(() => {
        message.success("Updated Success");
      })
      .catch(() => {
        message.error("Error! Try later");
      });
  };
  useEffect(() => {
    setContent(project.description);
    async function fetchCategory() {
      const { content } = await getAllCategory();
      setCategories(content);
    }
    form.setFieldsValue({
      projectName: project.projectName,
      categoryId: project.categoryName,
    });
    fetchCategory();
  }, [
    project.description,
    setCategories,
    project.categoryName,
    project.projectName,
    form,
  ]);
  return (
    <Drawer open={showDetail} onClose={() => setShowDetail(false)}>
      <Drawer.Body>
        <Form form={form} name="updateTask" onFinish={onFinish}>
          <h6>Edit Project</h6>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="col-span-1">
              <p className="mb-2">Project Name</p>
              <Form.Item name="projectName" rules={rules.projectName}>
                <Input
                  placeholder="Name Project"
                  defaultValue={project.projectName}
                />
              </Form.Item>
            </div>
            <div className="col-span-1">
              <p className="mb-2">Project Category</p>
              <Form.Item name="categoryId" rules={rules.category}>
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  defaultValue={project.categoryName}
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
          </div>
          <div>
            <p className="mb-2">Desciption</p>
            <Form.Item name="description">
              <Editor
                initialValue={project.description}
                name="description"
                apiKey="ikxdn5hg20ywcdqfjxtcs5isir0r091kal0lrngj7ex98881"
                init={{
                  selector: "textarea#myTextArea",
                  height: 400,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                }}
                onEditorChange={(content, editor) => {
                  setContent(content);
                }}
              />
            </Form.Item>
          </div>
          <div className="mt-4 flex items-center justify-end gap-3">
            <Button
              className="w-32 !h-10 mt-5 text-black"
              type="container"
              onClick={() => setShowDetail(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-32 !h-10 mt-5 !bg-prim-100"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
}

export default Draw;
