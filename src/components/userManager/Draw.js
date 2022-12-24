import React, { useContext } from 'react'
import { Drawer, Input, SelectPicker } from 'rsuite';
import { Editor } from "@tinymce/tinymce-react";
import { ProjectManagerContext } from '../../context/ProjectManagerContext';

function Draw() {
    const { showDetail, setShowDetail } = useContext(ProjectManagerContext);
    const category = ['Dự án web', 'Dự án app'].map(
      item => ({ label: item, value: item })
    );
    const submit = async () => {
      console.log("ok")
      setShowDetail(false)
    }
  return (
    <Drawer open={showDetail} onClose={() => setShowDetail(false)}>
        <Drawer.Body>
          <h6>Edit Project</h6>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="col-span-1">
              <p className="mb-2">Project Name</p>
              <Input placeholder="Basic usage" />
            </div>
            <div className="col-span-1">
              <p className="mb-2">Project Category</p>
              <SelectPicker data={category} block />
            </div>
          </div>
          <div>
              <p className="mb-2">Desciption</p>
          <Editor
            name="description"
            apiKey="530kfg5yc1x0o8feaxox06f6y5k6sshfevccgoh9j3yuvro7"
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
          />
          </div>
          <div className="mt-4 flex items-center justify-end gap-3">
          <button className="py-2 px-4 text-black flex items-center justify-center border-[lightgrey] bg-[#fff] rounded-md"
                onClick={() => submit()}>
                  Cancel
          </button>
          <button className="py-2 px-4 text-white flex items-center justify-center border-[#1677ff] bg-[#1677ff] rounded-md"
                onClick={() => submit()}>
                  Submit
          </button>
          </div>
        </Drawer.Body>
      </Drawer>
  )
}

export default Draw