import React, { useState, useEffect } from 'react';

import { TaskRow } from './components/TaskRow';
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';

const App = () => {
  const [userName, SetUserName] = useState('wolf');

  const [taskItems, setTaskItems] = useState([
    { name: 'Task One', done: false },
    { name: 'Task Two', done: false },
    { name: 'Task Tree', done: true },
    { name: 'Task Four', done: true },
  ]);

  const [showCompleted, setshowCompleted] = useState(true);
  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data != null) {
      setTaskItems(JSON.parse(data));
    } else {
      SetUserName('Saul Wolf');
      setTaskItems([
        { name: 'Task One Example', done: false },
        { name: 'Task Two Example', done: false },
        { name: 'Task Tree Example', done: true },
        { name: 'Task Four Example', done: true },
      ]);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTaskApp = (taskName) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  };

  const ToggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  const taskTableRows = (doneValue) =>
    taskItems
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow task={task} key={task.name} toggleTask={ToggleTask} />
      ));

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={createNewTaskApp} />
      <table className='table table-striped table-border'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{taskTableRows(false)}</tbody>
      </table>
      <div className='bg-secondary-text-white text-center p-2'>
        <VisibilityControl
          description='Completed Tasks'
          isChecked={showCompleted}
          callback={(checked) => setshowCompleted(checked)}
        />
      </div>

      {showCompleted && (
        <table className='table table-striped table-border'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(true)}</tbody>
        </table>
      )}
    </div>
  );
};

export default App;
