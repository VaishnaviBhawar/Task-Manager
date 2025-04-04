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

    return (
        <div className="flex justify-center items-center min-h-screen bg-indigo-800">
            <ToastContainer />
            <div className="w-full max-w-lg p-6 bg-yellow-100 shadow-2xl rounded-md text-black">
                <h2 className="text-center text-xl font-bold text-red-600">Task Manager</h2>

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

                <div className="max-h-64 overflow-y-auto border p-4 rounded-lg bg-white">
                    <p className="text-gray-700 text-center">No tasks yet!</p>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <input type="text" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-black" placeholder="Enter task..." value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
                    <input type="date" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-black" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
                    <input type="time" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-black" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />

                    <div className="flex gap-2">
                        <select className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-black" onChange={(e) => setPriority(e.target.value)}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900">➕ Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskApp;
