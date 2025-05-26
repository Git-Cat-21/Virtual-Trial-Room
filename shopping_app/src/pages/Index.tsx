import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 text-center">
        {/* Main Header */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-6xl font-light text-slate-800 mb-6 tracking-wide">
            Virtual Try On
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <h2 className="text-3xl font-light text-slate-600 tracking-wide">
            Choose the category
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
          <Card 
            className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in bg-gradient-to-br from-blue-100 to-cyan-100 w-full sm:w-auto"
            onClick={() => navigate("/clothing")}
          >
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">👕</div>
              <Button 
                className="w-40 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg transition-all duration-300"
              >
                Clothing
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in bg-gradient-to-br from-pink-100 to-orange-100 w-full sm:w-auto"
            style={{ animationDelay: "150ms" }}
            onClick={() => navigate("/customize")}
          >
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">✨</div>
              <Button 
                className="w-40 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg transition-all duration-300"
              >
                Customize
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in bg-gradient-to-br from-green-100 to-emerald-100 w-full sm:w-auto"
            style={{ animationDelay: "300ms" }}
            onClick={() => navigate("/accessories")}
          >
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">💍</div>
              <Button 
                className="w-40 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg transition-all duration-300"
              >
                Accessories
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Text */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <p className="text-slate-500 text-lg font-light">
            Experience fashion like never before
          </p>
        </div>
      </div>

      {/* Floating Elements for Visual Appeal */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
    </div>
  );
};

export default Index;