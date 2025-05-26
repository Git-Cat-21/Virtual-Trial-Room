import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { useRef } from "react";

const Accessories = () => {
  const navigate = useNavigate();
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const handlePlayVideo = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
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
          <h1 className="text-5xl font-light text-slate-800">Accessories</h1>
        </div>

        {/* Accessories Videos */}
        <div className="space-y-12 max-w-2xl mx-auto">
          {/* Ring Video */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-amber-50 animate-fade-in">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-medium text-slate-800 mb-6">Ring Collection</h2>
              <div className="aspect-video mb-6 bg-white rounded-lg shadow-inner overflow-hidden">
                <video 
                  ref={video1Ref}
                  className="w-full h-full object-cover rounded-lg"
                  loop
                  muted
                  poster="/placeholder.svg?height=300&width=500&text=Ring+Video"
                >
                  <source src="/assets/RING.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <Button 
                onClick={() => handlePlayVideo(video1Ref)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 transition-all duration-300 hover:shadow-lg flex items-center gap-2 mx-auto"
              >
                <Play className="w-4 h-4" />
                Play 3D View
              </Button>
            </CardContent>
          </Card>

          {/* Earring Video */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-pink-50 to-rose-50 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-medium text-slate-800 mb-6">Earring Collection</h2>
              <div className="aspect-video mb-6 bg-white rounded-lg shadow-inner overflow-hidden">
                <video 
                  ref={video2Ref}
                  className="w-full h-full object-cover rounded-lg"
                  loop
                  muted
                  poster="/placeholder.svg?height=300&width=500&text=Earring"
                >
                  <source src="/assets/earring.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <Button 
                onClick={() => handlePlayVideo(video2Ref)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 transition-all duration-300 hover:shadow-lg flex items-center gap-2 mx-auto"
              >
                <Play className="w-4 h-4" />
                Play 3D View
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Accessories Grid */}
        <div className="mt-16">
          <h3 className="text-3xl font-light text-slate-800 text-center mb-8">More Accessories</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Watches", image: "⌚", color: "from-slate-100 to-zinc-100" },
              { name: "Necklaces", image: "📿", color: "from-purple-100 to-indigo-100" },
              { name: "Bracelets", image: "💎", color: "from-green-100 to-emerald-100" }
            ].map((item, index) => (
              <Card 
                key={item.name}
                className={`group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${item.color} animate-fade-in`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.image}
                  </div>
                  <h4 className="text-xl font-medium text-slate-800 mb-4">
                    {item.name}
                  </h4>
                  <Button 
                    variant="outline" 
                    className="bg-white/70 border-slate-300 hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    View Collection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;