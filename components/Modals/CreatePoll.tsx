import React, { useCallback, useMemo, useRef, useState } from "react";
import { Modal, Button, Input, Switch, Form, Select } from "antd";

import styles from "./modal.module.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoMdClose } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import tipsData from "../../data/rules.json";
import { ReactComponent as TipLogo } from "../../asset/svg/tips.svg";
import { ReactComponent as LockLogo } from "../../asset/svg/lock.svg";
import { ReactComponent as Share } from "../../asset/svg/ph_share.svg";
import { ReactComponent as Plus } from "../../asset/svg/circlePlus.svg";
import { ReactComponent as Calender } from "../../asset/svg/calender.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useSubmitPoll from "../../hooks/poll/useCreatePoll";
import { PollRequest } from "../../types/createPolls.type";
import useNotify from "../../hooks/useNotify";
import Compressor from "compressorjs";

interface PollCreationModalProps {
  isModalVisible: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
}

interface BaseCriterion {
  label: string;
  type: string;
  value: string;
}

interface SelectCriterion extends BaseCriterion {
  type: "select";
  options: string[];
}

type Criterion = BaseCriterion | SelectCriterion;

const PollCreationModal: React.FC<PollCreationModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const notify = useNotify();

  const [text, setText] = useState("");
  // const [options, setOptions] = useState<string[]>(["", "", ""]);
  const [switchStates, setSwitchStates] = useState([true, true, true, true]);
  const [date, setDate] = useState<Date | null>(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");

  const insertToEditor = useCallback((url: any) => {
    const editor = (quillRef.current as unknown as ReactQuill).getEditor();
    const range = editor.getSelection();
    if (range) {
      editor.insertEmbed(range.index, "image", url);
    }
  }, []);

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        new Compressor(file, {
          quality: 0.6,
          maxWidth: 400,
          maxHeight: 400,
          convertSize: 500000,
          success(result: any) {
            const reader = new FileReader();
            reader.onload = function (e) {
              if (e.target && typeof e.target.result === "string") {
                const compressedDataUrl = e.target.result;
                if (compressedDataUrl.length <= 80 * 1024) {
                  insertToEditor(compressedDataUrl);
                } else {
                  console.error("Compressed image is still too large");
                }
              } else {
                console.error("Failed to load compressed image");
              }
            };
            reader.readAsDataURL(result);
          },
          error(err) {
            console.error(err.message);
          },
        });
      }
    };
  }, [insertToEditor]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
    }),
    [handleImageUpload]
  );

  const [options, setOptions] = useState<
    Array<{ choice_text: string; content?: string }>
  >([
    { choice_text: "", content: "" },
    { choice_text: "", content: "" },
    { choice_text: "", content: "" },
  ]);
  const { submitPoll } = useSubmitPoll();

  const [editorHtml, setEditorHtml] = useState("");
  const quillRef = useRef(null);
  const [criteria, setCriteria] = useState([
    { label: "Age", type: "number", value: "" },
    { label: "Gender", type: "select", value: "", options: ["Male", "Female"] },
    { label: "Location", type: "text", value: "" },
  ]);

  const formattedDeadline = date
    ? date.toISOString() // Converts the date to ISO 8601 string in UTC
    : null;

  const addCriteria = () => {
    setCriteria([
      ...criteria,
      { label: "", type: "text", value: "", options: [] },
    ]);
  };
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { Option } = Select;

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOptions(items);
  };

  const deleteOption = (index: any) => {
    const newOptions = options.filter((_, idx) => idx !== index);
    setOptions(newOptions);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // Handle changes in the Quill editor
  const handleEditorChange = (content: string) => {
    setEditorHtml(content);
  };

  // Add an option
  const addOption = () => {
    setOptions([...options, { choice_text: "", content: "" }]);
  };

  // Handle option text change
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = options.map((option, idx) => {
      if (idx === index) {
        return { ...option, choice_text: value };
      }
      return option;
    });
    setOptions(newOptions);
  };

  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };
  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={40} height={40} />;
  };

  const handleSwitchChange = (index: any) => {
    const updatedSwitches = switchStates.map((item, i) =>
      i === index ? !item : item
    );
    setSwitchStates(updatedSwitches);
  };

  if (!isModalVisible) {
    return null;
  }

  const resetFormState = () => {
    setText("");
    setSwitchStates([true, true, true, true]);
    setDate(null);
    setAge("");
    setGender("");
    setLocation("");
    setTitle("");
    setEditorHtml("");
    setOptions([
      { choice_text: "", content: "" },
      { choice_text: "", content: "" },
      { choice_text: "", content: "" },
    ]);
    setCriteria([
      { label: "Age", type: "number", value: "" },
      {
        label: "Gender",
        type: "select",
        value: "",
        options: ["Male", "Female"],
      },
      { label: "Location", type: "text", value: "" },
    ]);
    setEditorState(EditorState.createEmpty());
  };

  const onFormSubmit = async () => {
    const pollData: PollRequest = {
      question: "dbbd",
      content: "<h2>ddbbd</h2>",
      tags: ["Geography", "Capitals"],
      choices: [
        {
          choice_text: "dhhdhd",
          content: "",
          is_correct: false, // Assuming false, adjust according to your logic
        },
        {
          choice_text: "dbdbdhdh",
          content: "",
          is_correct: false, // Adjust as needed
        },
        {
          choice_text: "dhhdhd",
          content: "",
          is_correct: false, // Adjust as needed
        },
      ],
      collaborative: true,
      demographic_criteria: {},
      deadline: "2024-02-27T23:00:00.000Z",
      // "is_flagged": true, // Assuming true, adjust according to your actual data
      // "is_boosted": true, // Assuming true, adjust as needed
      // "review_status": "UR", // Use the actual review status
      // "is_legacy": true, // Assuming true, adjust as necessary
      // "added_by_admin": true // Assuming true, adjust if different
    };
    
    try {
      await submitPoll(pollData);
      notify("Poll created successfully!", "success");
      resetFormState();
      handleCancel();
    } catch (error: any) {
      console.error("Poll submission error:", error);
      notify("Failed to create the poll. Please try again.", "info");
    }
  };

  const isEditorEmpty =
    editorHtml.trim() === "" || editorHtml.trim() === "<p><br></p>";

  const createButtonStyle = !isEditorEmpty
    ? { backgroundColor: "#FF4105", borderColor: "#FF4105" }
    : { backgroundColor: "#FFC9B8", borderColor: "#FFC9B8" };

  return (
    <Modal
      title="Create New Poll"
      open={isModalVisible}
      onOk={onFormSubmit}
      onCancel={handleCancel}
      width={900}
      zIndex={10000}
      className={styles.modal}
      footer={[
        <div className={styles.modalFooter}>
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={onFormSubmit}
            className={styles.modalFooterTwo}
            style={createButtonStyle}
          >
            Create Poll
          </Button>
        </div>,
      ]}
    >
      <div className={styles.divder}></div>
      <div className={styles.creatPollWrap}>
        <div className={styles.pollSide}>
          <span className={styles.polltipsLogo}>
            <TipLogo />
            Tips on better poll
          </span>
          <ul style={{ listStyle: "none", padding: "0px" }}>
            {tipsData.tips.map((tip, index) => (
              <li key={index} className={styles.tips}>
                {index + 1}. {tip.rules}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.pollMiddle}>
          <div
            className={`${styles.editorToolbarBottom} ${styles.removeFroalaBranding}`}
          >
            <p className={styles.pas}>
              <span>Create a Poll </span> Perfect to share your thought or get
              input
            </p>

            <input
              type="text"
              className={styles.pollInput}
              placeholder="Title Question"
              value={title}
              onChange={handleTitleChange}
            />

            <ReactQuill
              ref={quillRef}
              value={editorHtml}
              onChange={handleEditorChange}
              modules={modules}
              theme="snow"
              placeholder="Write your poll here..."
              className={styles.customQuillContainer}
            />
          </div>

          <div className={styles.modalCreateHeader}>
            <div className={styles.modalCreateOptionsHead}>
              <p className={styles.modalCreateOptionsHeadOne}>Answer Options</p>
              <p className={styles.modalCreateOptionsHeadTwo}>Paste Answers</p>
            </div>

            <div className={styles.modalCreateOptions}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="options">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={styles.dragableOptionWrapper}
                    >
                      {options.map((option, index) => (
                        <Draggable
                          key={`option-${index}`}
                          draggableId={`option-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.dragableOption}
                            >
                              <Input
                                type="text"
                                value={option.choice_text} // Make sure this is correctly accessing a string
                                onChange={(e) =>
                                  handleOptionChange(index, e.target.value)
                                }
                              />
                              <IoMdClose
                                onClick={() => deleteOption(index)}
                                size={14}
                                className={styles.dragIconCancle}
                              />

                              <MdDragIndicator size={20} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Button className={styles.addMoreOptions} onClick={addOption}>
                <Plus
                  style={{ width: "15px", height: "15px", marginRight: "5px" }}
                />{" "}
                Add More Option
              </Button>

              <p className={styles.settingsText}>Settings</p>

              <div className={styles.settings}>
                <div className={styles.settingsGrid}>
                  <div className={styles.settingsItem}>
                    <span>Collaborative</span>
                    <Switch
                      checked={switchStates[0]}
                      onChange={() => handleSwitchChange(0)}
                    />
                  </div>
                  <div className={styles.settingsItem}>
                    <span>Dynamic Voting</span>
                    <Switch
                      checked={switchStates[1]}
                      onChange={() => handleSwitchChange(1)}
                    />
                  </div>
                </div>

                <div className={styles.endON}>
                  <div className={styles.settingsGrid}>
                    <div className={styles.settingsItemEnd}>
                      <div className={styles.pollIn}>
                        <span>End of Poll On</span>
                        <Switch
                          checked={switchStates[2]}
                          onChange={() => handleSwitchChange(2)}
                        />
                      </div>
                      {switchStates[2] && (
                        <div className={styles.settingsItemIN}>
                          <DatePicker
                            selected={date}
                            onChange={(newDate: Date | null) =>
                              setDate(newDate)
                            }
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/yyyy"
                            className={styles.settingsItemInput}
                          />
                          <Calender
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className={styles.settingsItemEnd}>
                      <div className={styles.pollIn}>
                        <span>Privacy</span>
                        <Switch
                          checked={switchStates[3]}
                          onChange={() => handleSwitchChange(3)}
                        />
                      </div>
                      {switchStates[3] && (
                        <div className={styles.settingsItemIN}>
                          <input
                            style={{
                              width: "190px",
                            }}
                            placeholder="https;//www/pollrepo.com"
                            className={styles.settingsItemInput}
                          />
                          <Share
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.pollCriteria}>
            <span>Criteria:</span>
            {criteria.map((criterion, index) => (
              <div key={index} className={styles.criteria}>
                <input
                  type="text"
                  placeholder="Label"
                  value={criterion.label}
                  onChange={(e) => {
                    const newCriteria = [...criteria];
                    newCriteria[index] = {
                      ...criterion,
                      label: e.target.value,
                    };
                    setCriteria(newCriteria);
                  }}
                  className={styles.inputCriteria}
                />
                {criterion.type === "select" ? (
                  <select
                    value={criterion.value}
                    onChange={(e) => {
                      const newCriteria = [...criteria];
                      newCriteria[index].value = e.target.value;
                      setCriteria(newCriteria);
                    }}
                    className={styles.inputCriteria}
                  >
                    {/* Use optional chaining with nullish coalescing to provide an empty array as fallback */}
                    {(criterion.options ?? []).map((option, optIndex) => (
                      <option key={optIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={criterion.type}
                    value={criterion.value}
                    onChange={(e) => {
                      const newCriteria = [...criteria];
                      newCriteria[index].value = e.target.value;
                      setCriteria(newCriteria);
                    }}
                    className={styles.inputCriteria}
                    // placeholder={criterion.label}
                  />
                )}
              </div>
            ))}
            <Button className={styles.addMoreOptions} onClick={addCriteria}>
              <Plus
                style={{ width: "15px", height: "15px", marginRight: "5px" }}
              />
              Add More Criteria
            </Button>
          </div>
        </div>
        <div className={styles.pollSide}>
          <span className={styles.polltipsLogo}>
            <LockLogo />
            Rules for a better poll
          </span>
          <ul style={{ listStyle: "none", padding: "0px" }}>
            {tipsData.tips.map((tip, index) => (
              <li key={index} className={styles.tips}>
                {index + 1}: {tip.rules}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default PollCreationModal;
