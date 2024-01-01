

import NutritionDashboard from './NutritionDashboard';
import RenderBarChart from './RenderBarChart';
import MealPlannerComponent from "./MealPlannerComponent";

function NutritionPage() {
  return (
    <div className="NutritionPage">
      <NutritionDashboard />
      <RenderBarChart />
      <MealPlannerComponent />
     
    
    </div>
  );
}

export default NutritionPage;
