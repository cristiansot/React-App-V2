import AddFoodForm from './components/AddFoodForm';
import NutritionDashboard from './components/NutritionDashboard';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <NutritionDashboard />
      <AddFoodForm />
    </div>
  );
}

export default App;
