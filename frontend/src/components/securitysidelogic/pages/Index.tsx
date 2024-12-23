import Header from "../components/Header";
import AlertForm from "../components/AlertForm";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <div className="flex-1">
        <Header />
        
        <main className="p-6">
          <AlertForm />
        </main>
      </div>
    </div>
  );
};

export default Index;