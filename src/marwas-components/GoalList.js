import React from 'react';

const GoalList = ({ goal, onDeleteGoal }) => {
    return (
        <div>
            <ul> 
                {goal.map((goal) => (
                    <li key=  {goal.id} >   {goal.title}
                        <button className="DeleteButton" onClick={() => onDeleteGoal(goal.id)} > <strong>  Reset  </strong> </button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default GoalList;
