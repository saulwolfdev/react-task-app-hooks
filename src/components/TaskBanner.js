import React from 'react';

export const TaskBanner=({userName,taskItems})=>(
<h4 className="bg-primary text-white text-center p-4">	
	{userName}'s task app {taskItems.filter(t=>!t.done).length}
</h4>
)