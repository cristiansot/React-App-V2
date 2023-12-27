
import MealPlannerComponent from "./MealPlannerComponent";
import NutritionDashboard from './NutritionDashboard';
import RenderBarChart from './RenderBarChart';

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
