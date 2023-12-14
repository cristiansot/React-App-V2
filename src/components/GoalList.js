import React from 'react';

const GoalList = ({ weeklyGoals, onDeleteGoal }) => {
    return (
        <div>
            <ul> 
                {weeklyGoals.map((weeklyGoal) => (
                    <li key=  {weeklyGoal.value} >   {weeklyGoal.label}
                        <button className="DeleteButton" onClick={() => onDeleteGoal(weeklyGoal.id)} > <strong>  Reset  </strong> </button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default GoalList;
