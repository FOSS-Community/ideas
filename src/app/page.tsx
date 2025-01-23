// import { FloatingNav } from "@/components/ui/floating-navbar";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FloatingParticles } from "@/components/ui/floating-particles"
import { Spotlight } from "@/components/ui/spotlight"
import { Footer } from "@/components/Footer"
import IdeasTable from "@/components/IdeasTable";

export default function IdeasPage() {
  return (
    <div className="min-h-screen backdrop-blur-sm">
      {/* Header */}
      <div className="min-h-screen w-full bg-black/[0.96] antialiased relative overflow-hidden">
            
            <div className="absolute inset-0 z-[1] pointer-events-none">
              <BackgroundLines className="h-full bg-transparent">
                <></>
              </BackgroundLines>
            </div>
            <div className="absolute inset-0 z-[2]">
              <FloatingParticles />
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="green"
              />
            </div>
            
            <IdeasTable />
        </div>
        
      <Footer />
    </div>
  )
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  timeframe: string;
  prize: string;
  status: string;
  category: string[];
  comments: number;
  tags: string[];
}

