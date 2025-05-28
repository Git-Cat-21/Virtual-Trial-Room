import { data, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Clothing = () => {
  const navigate = useNavigate();

  const clothingItems = [
    { 
      id: 1, 
      name: "Item 1", 
      image:"/assets/1.png",
      color: "from-blue-100 to-cyan-100"
    },
    { 
      id: 2, 
      name: "Item 2", 
      image: "/assets/2.png",
      color: "from-pink-100 to-rose-100"
    },
    { 
      id: 3, 
      name: "Item 3", 
      image: "/assets/3.png",
      color: "from-green-100 to-emerald-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mr-4 hover:bg-white/50 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Home Page
          </Button>
          <h1 className="text-5xl font-light text-slate-800">Shopping Page</h1>
        </div>

        {/* Clothing Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {clothingItems.map((item, index) => (
            <Card 
              key={item.id}
              className={`group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br ${item.color} animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="aspect-[4/5] mb-6 bg-white rounded-lg shadow-inner overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition-all duration-300 hover:shadow-lg"
                    onClick={() => {
                        fetch("http://localhost:5000/body_map")
                        .then((res)=>res.json())
                        .then((data) => {
                          console.log("Pose detection started", data);
                          // alert("Pose detection started!");
                        })
                        .catch((err) =>{
                          console.error("Error starting body map:", err);
                          // alert("Failed to start pose detection");
                        });

                    }}
                  >
                    Try On
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full bg-white/70 border-slate-300 hover:bg-white hover:shadow-md transition-all duration-300 text-slate-700 hover:text-slate-900 py-3"
                  >
                    3D View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clothing;