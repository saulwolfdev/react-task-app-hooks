import React, { useState, useEffect } from "react";

import {TaskRow} from "./components/TaskRow";
const App=()=>{

const [userName,SetUserName] = useState("wolf");
const [taskItems, setTaskItems] = useState([
	{name:"Task One",done:false},
	{name:"Task Two",done:false},
	{name:"Task Tree",done:true},
	{name:"Task Four",done:true},
]);
const ToggleTask=task=>
setTaskItems(taskItems.map(t=>(t.name===task.name)?{...t, done:!t.done}:t))
const taskTableRoms=()=>
	taskItems.map(task=>(
		<TaskRow 
		task={task} 
		key={task.name}
		toggleTask={ToggleTask}
		/>
	));

	return (
	<div>
		<h1>TABLE</h1>
		<table>
			<thead>
							<tr>
				<th>Description</th>
				<th>Done</th>
			</tr>
			</thead>
			<tbody>
				{taskTableRoms()}
			</tbody>
		</table>
	</div>);
}
 
export default App;