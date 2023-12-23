import MealPlannerComponent from './MealPlannerComponent';
import NutritionDashboard from './NutritionDashboard';

function NutritionPage() {
  return (
    <div className="NutritionPage">
      <NutritionDashboard />
      <MealPlannerComponent />
    </div>
  );
}

export default NutritionPage;
