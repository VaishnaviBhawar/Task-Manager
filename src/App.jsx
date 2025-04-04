import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskApp = () => {
    const [taskInput, setTaskInput] = useState("");
    const [priority, setPriority] = useState("high");
    const [taskList, setTaskList] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [taskDate, setTaskDate] = useState("");
    const [taskTime, setTaskTime] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    // ✅ Function to Add Task
    const handleAddTask = () => {
        if (taskInput.trim() === "" || taskDate === "" || taskTime === "") {
            toast.error("Please fill all fields! ⚠️");
            return;
        }

        const newTask = { text: taskInput, priority, date: taskDate, time: taskTime };

        if (editIndex !== null) {
            // ✅ Update existing task
            const updatedTasks = [...taskList];
            updatedTasks[editIndex] = newTask;
            setTaskList(updatedTasks);
            setEditIndex(null);
            toast.success("Task Updated ✅");
        } else {
            // ✅ Add new task
            setTaskList([...taskList, newTask]);
            toast.success("Task Added 🎉");
        }

        // ✅ Clear Input Fields
        setTaskInput("");
        setTaskDate("");
        setTaskTime("");
        setPriority("high");
    };

    // ✅ Function to Delete Task
    const handleDeleteTask = (index) => {
        const updatedTasks = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTasks);
        toast.error("Task Removed ❌");
    };

    // ✅ Function to Edit Task
    const handleEditTask = (index) => {
        const taskToEdit = taskList[index];
        setTaskInput(taskToEdit.text);
        setTaskDate(taskToEdit.date);
        setTaskTime(taskToEdit.time);
        setPriority(taskToEdit.priority);
        setEditIndex(index);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-indigo-800">
            <ToastContainer />
            <div className="w-full max-w-lg p-6 bg-yellow-100 shadow-2xl rounded-md text-black">
                <h2 className="text-center text-xl font-bold text-red-600">Task Manager</h2>

                {/* ✅ Task Filter Buttons */}
                <div className="flex justify-center gap-3 my-4">
                    {["all", "high", "medium", "low"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-2 rounded-lg ${filterType === type ? "bg-blue-600 text-white" : "bg-orange-500"}`}
                        >
                            {type.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* ✅ Task List Container */}
                <div className="max-h-64 overflow-y-auto border p-4 rounded-lg bg-white">
                    {taskList.length === 0 ? (
                        <p className="text-gray-700 text-center">No tasks yet!</p>
                    ) : (
                        taskList
                            .filter((task) => filterType === "all" || task.priority === filterType)
                            .map((task, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center p-2 mb-2 border-l-4 ${
                                        task.priority === "high"
                                            ? "border-red-500 bg-red-200"
                                            : task.priority === "medium"
                                            ? "border-yellow-500 bg-yellow-200"
                                            : "border-green-500 bg-green-200"
                                    }`}
                                >
                                    <div>
                                        <p className="font-semibold">{task.text}</p>
                                        <p className="text-xs text-gray-700">{task.date} | {task.time}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditTask(index)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(index)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            ))
                    )}
                </div>

                {/* ✅ Task Input Fields */}
                <div className="flex flex-col gap-2 mt-4">
                    <input
                        type="text"
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-black"
                        placeholder="Enter task..."
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                    />
                    <input
                        type="date"
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-black"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                    />
                    <input
                        type="time"
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-black"
                        value={taskTime}
                        onChange={(e) => setTaskTime(e.target.value)}
                    />

                    {/* ✅ Priority Selection & Add Button */}
                    <div className="flex gap-2">
                        <select
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-black"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <button
                            onClick={handleAddTask}
                            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900"
                        >
                            {editIndex !== null ? "✏️ Update" : "➕ Add"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskApp;
